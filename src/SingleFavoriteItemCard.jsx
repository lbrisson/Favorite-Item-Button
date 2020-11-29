import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "../menus/menu.module.css";
import FavoritesMenuCardModal from "./FavoritesMenuCardModal";
import UnFavoriteOnlyButton from "../favorites/UnFavoriteOnlyButton";


function SingleFavoriteItemCard(props) {
  const aFavoriteItem = props.aFavoriteItem;
  const ref = useRef(null);

  let menuItemClicked = function () {
    ref.current.handleShow();
    console.log(aFavoriteItem);
  };
  let rateProduct = () => {
    console.log("Leave Rated Comment for Vendor...");
    props.ratingButton(aFavoriteItem);
  };

  const selectCard = () => {
    props.selectCard(aFavoriteItem);
  };

  return (
    <React.Fragment>
      <div className="col-lg-6">
        <div
          className={`${styles.foodCardContainer} card card-default`}
          type="button"
        >
          <div className={` ${styles.foodCard} card-body text-center}`}>
            <div
              className={` ${styles.foodPics} container`}
              onClick={menuItemClicked}
            >
              <img
                src={props.aFavoriteItem.product.images[0].url}
                className={styles.foodImage}
              />
            </div>
            <h3 className={`m-0 text-bold`}>
              {props.aFavoriteItem.product.name}
            </h3>
            <p>{`$${props.aFavoriteItem.product.cost.toFixed(2)}`}</p>
            <span>
              <UnFavoriteOnlyButton
                favoritedItemId={props.aFavoriteItem.typeInfo.id}
                favoritedTableId={props.aFavoriteItem.id}
                removeFavorite={props.removeFavorite}
              />
            </span>
            <div
              className="row d-flex"
              style={{ width: "100%", justifyContent: "space-evenly" }}
            >
              <button
                className={`${styles.ratingButton} text-sm btn btn-outline-primary`}
                onClick={rateProduct}
                type="button"
              >
                Rate Product
              </button>
              <button
                className={`${styles.viewCommentsButton} text-sm btn btn-outline-primary`}
                onClick={selectCard}
                type="button"
              >
                View Comments
              </button>
            </div>
          </div>
        </div>
      </div>
      <FavoritesMenuCardModal
        ref={ref}
        aFavoriteItem={props}
        updateCart={props.updateCart}
      />
    </React.Fragment>
  );
}

SingleFavoriteItemCard.propTypes = {
  aFavoriteItem: PropTypes.shape({
    createdBy: PropTypes.number,
    favoritedItemId: PropTypes.number,
    id: PropTypes.number,
    currentUser: PropTypes.shape({
      avatarUrl: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    product: PropTypes.shape({
      name: PropTypes.string,
      cost: PropTypes.number,
      description: PropTypes.string,
      isActive: PropTypes.bool,
      isVisible: PropTypes.bool,
      vendorId: PropTypes.number,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
        })
      ),
    }),
    typeInfo: PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
    }),
    vendorInfo: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  toggleModal: PropTypes.func,
  isOpen: PropTypes.bool,
  updateCart: PropTypes.func,
  ratingButton: PropTypes.func,
  selectCard: PropTypes.func,
  removeFavorite: PropTypes.func,
};

export default React.memo(SingleFavoriteItemCard);
