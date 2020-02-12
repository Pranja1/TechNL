import React, { Component } from "react";
import axios from "axios";
import sortBy from "lodash/sortBy";

class CountryListGetApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      countryList: [],
      continent: "",
      errorMsg: "",
      loading: true
    };
  }

  //on the change event for the select box pass the selected value
  onDropdownSelected = e => {
    //Get the target.value pass it to continent
    this.setState({
      continent: e.target.value
    });
  };
  //call api using axios get method
  componentDidMount() {
    axios
      .get(
        "https://z9blqe7usb.execute-api.eu-west-1.amazonaws.com/dev/countries"
      )
      .then(response => {
        //store the response object in results and perform sortby inbuilt method from loadash on same
        const results = sortBy(response.data, "name");
        //get all continent from results
        const allContinents = sortBy(results.map(country => country.continent));
        //store the unique continent in uniqueContinentsList
        const uniqueContinentsList = allContinents.filter(
          (country, index) => allContinents.indexOf(country) === index
        );
        // update the state
        this.setState({
          loading: false,
          results: results,
          countryList: uniqueContinentsList
        });
      })
      .catch(error => {
        //catch Block: Error handling
        this.setState({
          loading: false,
          errorMsg: "issue with fetching data"
        });
      });
  }

  render() {
    // define const
    const {
      results,
      loading,
      countryList,
      selected,
      continent,
      value,
      errorMsg
    } = this.state;

    return (
      <div>
        {/*spinner block : Loading Message*/}
        {loading ? <div>Loading......</div> : null}
        {/*content block : with result data*/}
        {results.length ? (
          <ul>
            <div>
              {/*continent name drop down block */}
              <select onChange={this.onDropdownSelected} value={value}>
                <option value="">Showing all countries...</option>
                {countryList.map(continentName => {
                  return (
                    <option
                      value={continentName}
                      key={continentName}
                      selected={selected}
                    >
                      {continentName}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*resultset display block */}
            {results.map(i => {
              if (i.continent === continent || continent === "") {
                if (i.population > 60000000) {
                  return (
                    <li style={{ color: "blue" }}>
                      {i.name} - {i.population} - {i.continent}
                    </li>
                  );
                } else {
                  return (
                    <li style={{ color: "black" }}>
                      {i.name} - {i.population} - {i.continent}
                    </li>
                  );
                }
              }
            })}
          </ul>
        ) : null}
         {/*error display block */}
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}

export default CountryListGetApi;
