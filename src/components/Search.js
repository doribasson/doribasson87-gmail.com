import React, { Component } from "react";
import { connect } from "react-redux";
import { searchCity } from "../actions/searchAction";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { API_AUTOCOMPLETE } from "../actions/type";

class Search extends Component {
  state = {
    itemSelected: false,
    inputVal: "",
    options: [],
    selectedOption: ""
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.props.searchCity(
        event.target.value.substr(0, event.target.value.indexOf(","))
      );
    }
  };

  updateState = e => {
    try {
      if (e.target.textContent !== "")
        this.props.searchCity(
          e.target.textContent.substr(0, e.target.textContent.indexOf(","))
        );
      const val = e.target.value;

      axios.get(`${API_AUTOCOMPLETE}${val}`).then(res => {
        if (res.data !== null && res.data !== "") {
          const options = res.data.map(
            item =>
              item.LocalizedName +
              ", " +
              item.Country.ID.toLowerCase() +
              "  " +
              item.Country.LocalizedName.toLowerCase()
          );

          this.setState({
            itemSelected: true,
            options: options
          });
        }
      });
    } catch (err) {
      console.log(err, "search error from Search.js");
    }
  };

  searchCity = () => {
    this.props.searchCity(this.state.value);
  };

  componentDidMount() {}

  render() {
    const autoCompleteRender = (
      <Autocomplete
        getOptionSelected={(option, value) => value.id === option.id}
        freeSolo={false}
        disableClearable={false}
        disabled={false}
        id="limoSelect"
        className="search-inbox"
        onChange={this.updateState}
        value={this.state.inputVal}
        options={this.state.options}
        renderInput={params => (
          <TextField
            {...params}
            // label="Search field"
            id="outlined-search"
            type="search"
            value=""
            margin="normal"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{ ...params.InputProps, type: "search" }}
            // onClick={() => console.log(this.state.selectedOption)}
            onChange={e => this.updateState(e)}
            onKeyPress={e => this.handleKeyPress(e)}
          />
        )}
      />
    );
    return (
      <div className="NewSearch">
        <>{autoCompleteRender}</>
      </div>
    );
  }
}

export default connect(null, { searchCity })(Search);
