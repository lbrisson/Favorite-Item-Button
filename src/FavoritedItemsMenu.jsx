import React from "react";
import * as favoritesService from "../../services/favoritesService";
import PropTypes from "prop-types";
import SingleFavoriteItemCard from "../favorites/SingleFavoriteItemCard";
import styles from "../menus/menu.module.css";
import favoriteStyles from "./favorite.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../styles/body.css";


class FavoritedItemsMenu extends React.Component {
  state = {
    pageIndex: 1,
    pageSize: 40,
    totalCount: 0,
    productType: 0,
    vendorId: this.props.location.state,
    show: false,
    currentUserId: this.props.currentUser.id,
  };

  componentDidMount = () => {
    console.log("User Id: ", this.props.currentUser.id);
    this.getUserFavorites(this.props.currentUser.id);
  };

  getUserFavorites = (userId) => {
    favoritesService
      .getAllUserFavorites(
        this.state.pageIndex - 1,
        this.state.pageSize,
        userId
      )
      .then(this.onGetFavoritesSuccess)
      .catch(this.onGetFavoritesFailure);
  };

  onGetFavoritesSuccess = (response) => {
    console.log("1", response.data.item.pagedItems);

    let favoritedItems = response.data.item.pagedItems;
    let totalCount = response.data.item.totalCount;
    let mappedFavMenu = favoritedItems.map(this.mapFavoriteItems);

    this.setState((prevState) => {
      return {
        ...prevState,
        favorites: favoritedItems,
        mappedFavMenu,
        favoritedItems,
        totalCount,
      };
    });
  };

  onGetFavoritesFailure = (errResponse) => {
    console.log(errResponse);
    toast.warning("Favorites did not Post...");
  };

  mapFavoriteItems = (favoriteItems) => (
    <SingleFavoriteItemCard
      aFavoriteItem={favoriteItems}
      key={favoriteItems.id}
      updateCart={this.props.updateCart}
      ratingButton={this.rateEntity}
      selectCard={this.onEntitySelect}
      removeFavorite={this.onRemoveFavorite}
    />
  );

  rateEntity = (entity) => {
    let previousPath = this.props.location.pathname;

    console.log("Rate & Comment Entity Triggered..", entity);
    console.log("Path:", previousPath);
    console.log("Path:", selectedEntity);

    var selectedEntity = {
      type: "Product to leave rating for...",
      payload: entity.favoritedItemId,
      prevPath: previousPath,
      productId: entity.favoritedItemId,
    };

    this.props.history.push(
      `/v2/entity/${entity.favoritedItemId}/ratedcomment`,
      selectedEntity
    );
  };

  onEntitySelect = (product) => {
    console.log("Topic was Selected...");
    console.log("Current Selected Topic:", product.product.name);
    let previousPath = this.props.location.pathname;
    this.props.history.push(
      `/v2/products/${product.favoritedItemId}/ratedcomments`,
      {
        currentProduct: product,
        path: previousPath,
      }
    );
  };

  onRemoveFavorite = (id) => {
    console.log("Remove Product From Favorites...", id);

    this.setState((prevState) => {
      const indexOfFavorites = prevState.favorites.findIndex(
        (singleFav) => singleFav.id === id
      );

      console.log("Index of Favorite Product: ", indexOfFavorites);

      const updatedFavorites = [...prevState.favorites];
      const updatedMappedFavorites = [...prevState.mappedFavMenu];

      if (indexOfFavorites >= 0) {
        updatedFavorites.splice(indexOfFavorites, 1);
        updatedMappedFavorites.splice(indexOfFavorites, 1);
      }
      return {
        favorites: updatedFavorites,
        mappedFavMenu: updatedMappedFavorites,
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={`${styles.background}`}>
          <Link
            style={{ fontSize: "30px" }}
            to="/vendor/landing"
            className={`${styles.backButton} previous ${styles.previous} round ${styles.round}`}
          >
            &#8678;
          </Link>
          <img
            className={styles.backgroundImage}
            src={
              "https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1920,format=auto,quality=50/https://cdn.doordash.com/media/store%2Fheader%2F5579.png"
            }
          ></img>
          <div
            className={`${favoriteStyles.favoriteFilled} p-4  text-center text-black`}
          >
            <h2 className="m-0 text-center">
              <span>
                <b style={{ color: "black" }}>Favorite Products</b>
              </span>
            </h2>
            <p className="mb-auto">
              Menu filled with only Your Favorite Products! Enjoy!
            </p>
          </div>
        </div>
        <div className={`${styles.scroll} scrollmenu`}>
          <div
            className={`${styles.typeCards} row justify-content-center`}
          ></div>
        </div>
        <div className="container" style={{ position: "relative" }}>
          <div className={`${styles.menuRow} row`}>
            {this.state.mappedFavMenu}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

FavoritedItemsMenu.propTypes = {
  aFavoriteItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    cost: PropTypes.number,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      currentUserId: PropTypes.number,
    }),
  }),
  vendorTypes: PropTypes.arrayOf(PropTypes.shape({})),
  updateCart: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default FavoritedItemsMenu;
