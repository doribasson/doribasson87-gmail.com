import React, { Component } from "react";
import { connect } from "react-redux";
import { storageAction } from "../actions/searchAction";
import axios from "axios";
import { API_ADDRESS_CURRENT, API_ADDRESS } from "../actions/type";
import { KEY_WEATHER } from "../actions/type";
import "bootstrap/dist/css/bootstrap.min.css";
import SplitText from "react-pose-text";
import Toggleswitch from "../components/Toggleswitch";

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

class Favorite extends Component {
  state = {
    city: [],
    flag: false,
    delCity: "",
    loading: true
  };

  async componentDidMount() {
    try {
      let storedWeather = [];

      storedWeather = await JSON.parse(localStorage.getItem("weatherInfo"));

      if (storedWeather) {
        storedWeather.map((cityName, i) => {
          this.fetchCity(cityName);
          return null;
        });
      }
      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  removeCity = rmCity => {
    let storedWeather = JSON.parse(localStorage.getItem("weatherInfo"));
    const filterItems = storedWeather.filter(city => city !== rmCity);
    localStorage.removeItem("weatherInfo");
    localStorage.setItem("weatherInfo", JSON.stringify(filterItems));
  };

  removeAll = () => {
    if (localStorage.getItem("weatherInfo") !== null)
      localStorage.removeItem("weatherInfo");
    this.setState({ flag: true });
  };

  componentWillUnmount() {}

  fetchCity = CityName => {
    try {
      axios.get(`${API_ADDRESS}${KEY_WEATHER}=${CityName}`).then(response => {
        if (response.status !== 200) {
          throw new Error("Unsuccessful request");
        }
        if (response.data[0] !== undefined) {
          const cityKey = response.data[0].Key;
          axios
            .get(`${API_ADDRESS_CURRENT}${cityKey}?apikey=${KEY_WEATHER}`)
            .then(response => {
              const updatedList = this.state.city.concat(response.data);

              this.setState({ city: updatedList });
            });
        }
      });
    } catch (err) {}
  };

  render() {
    let storedWeather = JSON.parse(localStorage.getItem("weatherInfo"));

    if (storedWeather) {
      return (
        <div className="container-favorite">
          <div className="toggle-container-favorite">
            <span className="toggle">
              <Toggleswitch />
            </span>
          </div>

          <div
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "30px"
            }}
          >
            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
              My favorites
            </SplitText>
          </div>
          {this.state.loading ? (
            <div className="spiner_loading">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="container-favorite-card">
              {this.state.city.map((data, i) => {
                const rmCity = storedWeather[i];
                if (rmCity !== this.state.delCity)
                  return (
                    <div key={i} className="favorite-card">
                      <h4 className="card-title">
                        <u>{storedWeather[i]}</u>
                      </h4>
                      <h5 className="card-text">
                        {data.Temperature.Metric.Value} ℃{" "}
                      </h5>
                      <h5 className="card-text">
                        {data.Temperature.Imperial.Value} F
                      </h5>
                      <h6 className="card-text">{data.WeatherText}</h6>
                    </div>
                  );
                return null;
              })}
            </div>
          )}
          <br />
          <div className="favorite-warnning">
            <button
              type="button"
              className="btn btn-info btn-lg"
              data-toggle="modal"
              data-target="#myModal"
            >
              <span className="fa fa-trash" style={{ fontSize: "20px" }}></span>{" "}
              Delete all favorites
            </button>

            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close1"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">Warnning</h4>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete all your favorites?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-info"
                      data-dismiss="modal"
                      onClick={this.removeAll}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (localStorage.getItem("weatherInfo") === null) {
      return (
        <div>
          <div className="toggle-container">
            <span className="toggle">
              <Toggleswitch />
            </span>
          </div>

          <div
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "30px",
              // marginLeft: "30px",
              textAlign: "center"
            }}
          >
            <br />
            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
              You dont have favorite
            </SplitText>
            <br />
            <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
              choose from the home page
            </SplitText>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  forcasts: state.searchReducer.forcasts,
  forcast: state.searchReducer.forcast,
  cityName: state.searchReducer.cityName,
  cityId: state.searchReducer.cityId,
  cityKey: state.searchReducer.cityKey
});

export default connect(mapStateToProps, { storageAction })(Favorite);
