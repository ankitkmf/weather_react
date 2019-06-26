import React, { Component } from "react";
import Axios from "axios";
import SearchResult from "./components/SearchResult";

class App extends Component {
  state = {
    cityname : "",
    error: "",
    fetchingData: false,
    weather: {
      "temperature": 101.57,
      "city": "Dubai",
      "country": "AE",
      "humidity": 40,
      "description": "dust",
      "error": ""
    }     
  };

  onTextChange = e => {
    this.setState({
      cityname: e.target.value
    });
  };

  onButtonClick=()=>{   
    this.fetchAllRecords("");
  } 

  fetchAllRecords = async test => {
    this.setState({ fetchingData: true, error: "" });
    const { cityname } = this.state;
    try {    
    
    let requestUri="http://localhost:3100/api/viewwheather"

    var result = {
      "username": "ankit",
      "cityname": cityname      
  };
  
      Axios.post(requestUri,result
      )
        .then(response => {      
       //  console.log("response:"+JSON.stringify(response.data));
         response=response.data.message  ;
         var weather={
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ""
        }
          this.setState({
            weather:weather
          })
  
          this.setState({
            fetchingData: false
          });
        })
        .catch(error => {
          this.setState({
            error: "No data found...",
            fetchingData: false
          });
        });
    
    }
    catch (error) {
      this.setState({
        error: "No data found...",
        fetchingData: false
      });
    }
    this.setState({ showAllData: true });
  }; 

  render() {
    return (
      <div className="container">
        <div className="header clearfix mt-5">
          <h3 className="text-muted">Weather Search</h3>
        </div>
        <div className="jumbotron">
          <div className="form-group row">
            <input
              className="mr-1 col-sm-9 form-control"
              type="text"
              placeholder="City name"
              name="cityname"
              onChange={this.onTextChange}
              value={this.state.cityname}
            />
            <button
              className="col-sm-2 btn btn-primary"
              onClick={this.onButtonClick}
            >
              Search
            </button>
          </div>
          {this.state.fetchingData ? (
            <p className="lead text-center">{"loading... "}</p>
          ) : (
            (this.state.error && (
              <p className="text-danger">{this.state.error}</p>
            )) ||  <SearchResult weatherdata={this.state.weather} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
