import React, { Component } from "react";
import styles from "./favorite.module.css";
import PropTypes from "prop-types";
import * as favoritesService from "../../services/favoritesService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";


class UnFavoriteOnlyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: true,
      favoritedItemId: this.props.favoritedItemId,
      favoritedTableId: this.props.favoritedTableId,
    };
  }

  favoriteSelect = () => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          favorited: !prevState.favorited,
        };
      },
      () => this.favoriteSetter()
    );

    console.log("props Id:", this.state.favoritedItemId);
    console.log("favorited Value from Select():", this.state.favorited);
  };

  favoriteSetter = () => {
    console.log("favorited Value from Setter():", this.state.favorited);

    if (this.state.favorited === false) {
      console.log("delete Favorited TableId:", this.state.favoritedTableId);
      favoritesService
        .deleteById(this.state.favoritedTableId)
        .then(this.onRemoveFavoriteSuccess)
        .catch(this.onRemoveFavoriteError);
    }
  };

  onRemoveFavoriteSuccess = (response) => {
    console.log("Item Removed from Your Favorites...");
    console.log(response);
    toast.success("Item Removed from Your Favorites...");

    this.props.removeFavorite(this.state.favoritedTableId);
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

UnFavoriteOnlyButton.propTypes = {
  favoritedItemId: PropTypes.number,
  favoriteSelect: PropTypes.func,
  favoritedTableId: PropTypes.number,
  removeFavorite: PropTypes.func,
  payload: PropTypes.shape({
    favoritedItemId: PropTypes.id,
  }),
};

export default withRouter(UnFavoriteOnlyButton);