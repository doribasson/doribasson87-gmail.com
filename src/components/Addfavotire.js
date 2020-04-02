import React, { Component } from "react";
import { connect } from "react-redux";
import { storageAction, checkStorage } from "../actions/searchAction";

export class Addfavotire extends Component {
  state = {
    favorite: false,
    lists: []
  };

  MyLocalStorage = () => {
    let deleteCity = this.props.cityName;
    let storedCity = JSON.parse(localStorage.getItem("weatherInfo")) || [];
    if (localStorage.length !== 0) {
      const result = storedCity.some(city => city === deleteCity);
      if (result) {
        this.delteCityFromFavorite(deleteCity);
      } else this.addCityToStorage();
    } else this.addCityToStorage();
  };

  addCityToStorage = () => {
    let addCity = this.props.cityName;
    let storedCity = JSON.parse(localStorage.getItem("weatherInfo")) || [];

    const result = storedCity.some(city => city === addCity);
    if (!result) storedCity.push(addCity);
    // document.querySelector(".fas.fa-star").style.color = "red";

    localStorage.setItem("weatherInfo", JSON.stringify(storedCity));
    this.props.storageAction(addCity);
    this.setState({ favorite: true });
  };

  delteCityFromFavorite = deleteCity => {
    let storedCity = JSON.parse(localStorage.getItem("weatherInfo"));
    const NewStoredCity = storedCity.filter(city => city !== deleteCity);
    document.querySelector(".fas.fa-star").style.color = "yellow";
    localStorage.removeItem("weatherInfo");
    localStorage.setItem("weatherInfo", JSON.stringify(NewStoredCity));
    this.setState({ favorite: false });
  };

  render() {
    let checkFavorite = JSON.parse(localStorage.getItem("weatherInfo"));

    if (checkFavorite !== null) {
      var doubled = checkFavorite.some(city => city === this.props.cityName);

      if (doubled === true) {
        return (
          <div className="Favorite-pos">
            <button className="btn btn-dark" onClick={this.MyLocalStorage}>
              <i className="fas fa-star" style={{ color: "#ffe000" }}></i>
            </button>
          </div>
        );
      } else if (doubled === false) {
        return (
          <div className="Favorite-pos">
            <button className="btn btn-dark" onClick={this.MyLocalStorage}>
              <i className="fas fa-star" style={{ color: "white" }}></i>
            </button>
          </div>
        );
      }
    }
    if (checkFavorite === null)
      return (
        <div className="Favorite-pos">
          <button className="btn btn-dark" onClick={this.MyLocalStorage}>
            <i className="fas fa-star" style={{ color: "white" }}></i>
          </button>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  cityName: state.searchReducer.cityName,
  cityId: state.searchReducer.cityId,
  cityKey: state.searchReducer.cityKey
});

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps, { storageAction, checkStorage })(
  Addfavotire
);
