import {
  FETCH_SEARCH,
  FETCH_STORAGE,
  FETCH_GEOLOCATION
} from "../actions/type";

const initialState = {
  forcast: [],
  forcasts: [],
  cityName: "tel-aviv",
  cityId: "",
  cityKey: "",
  dataLocation: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH:
      return {
        ...state,
        forcast: action.data,
        cityName: action.cityName,
        cityId: action.cityId,
        forcasts: action.forcasts,
        cityKey: action.cityKey
      };
    case FETCH_STORAGE:
      return {
        ...state,
        forcast: action.data,
        cityName: action.cityName,
        cityId: action.cityId,
        forcasts: action.forcasts,
        cityKey: action.cityKey
      };

    case FETCH_GEOLOCATION:
      return {
        ...state,
        data: action.data,
        dataLocation: action.dataLocation
      };

    default:
      return state;
  }
}
