import React, { Component } from "react";
import styles from "./favorite.module.css";
import PropTypes from "prop-types";
import * as favoritesService from "../../services/favoritesService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";


class FavoriteToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      favoritedItemId: this.props.favoritedItemId,
    };
  }

  favoriteSelect = () => {
    let payload = {
      favoritedItemId: this.state.favoritedItemId,
    };
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          favorited: !prevState.favorited,
        };
      },
      () => this.favoriteSetter(payload)
    );

    console.log("props Id:", this.state.favoritedItemId);
    console.log("favorited Value from Select():", this.state.favorited);
  };

  favoriteSetter = (payload) => {
    console.log("favorited Value from Setter():", this.state.favorited);

    if (this.state.favorited === false) {
      console.log("delete Favorited Id:", this.state.recentFavoritedId);
      favoritesService
        .deleteById(this.state.recentFavoritedId)
        .then(this.onRemoveFavoriteSuccess)
        .catch(this.onRemoveFavoriteError);
    }

    if (this.state.favorited === true) {
      console.log("add Favorited Id:", payload);

      favoritesService
        .addRequest(payload)
        .then(this.onAddFavoriteSuccess)
        .catch(this.onAddFavoriteError);
    }
  };

  onAddFavoriteSuccess = (response) => {
    console.log("Item Added to Your Favorites");
    console.log("New Favorited Id: ", response.item);
    toast.success("Item Added to Your Favorites");

    let newFavoriteAdded = response.item;

    this.setState((prevState) => {
      return {
        ...prevState,
        recentFavoritedId: newFavoriteAdded,
      };
    });
  };

  onAddFavoriteError = () => {
    console.log("Failed to Add to Favorites...");
    toast.error("Failed to Add to Favorites...");
  };

  onRemoveFavoriteSuccess = (response) => {
    console.log("Item Removed from Your Favorites...");
    console.log(response.item);
    toast.success("Item Removed from Your Favorites...");
  };

  onRemoveFavoriteError = () => {
    console.log("Failed to Remove from Favorites...");
    toast.error("Failed to Remove from Favorites...");
  };

  render() {
    return (
      <div>
        {this.state.favorited === false ? (
          <div
            className={`${styles.favoriteEmpty} `}
            onClick={this.favoriteSelect}
            id="empty"
          >
            <em className={`${styles.favoriteEmpty}fa-2x mr-2 far fa-heart`} />
          </div>
        ) : (
          <div
            className={`${styles.favoriteFilled} `}
            onClick={this.favoriteSelect}
          >
            <em className={`${styles.favoriteFilled}fa-2x mr-2 fas fa-heart`} />
          </div>
        )}
        <small></small>
      </div>
    );
  }
}

FavoriteToggleButton.propTypes = {
  favoritedItemId: PropTypes.number,
  favoriteSelect: PropTypes.func,
  payload: PropTypes.shape({
    favoritedItemId: PropTypes.id,
  }),
};

export default withRouter(FavoriteToggleButton);

