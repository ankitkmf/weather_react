import React from "react";

const SearchResult = ({ weatherdata }) => {
//console.log(JSON.stringify(weatherdata));
  return (
    <div >
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Location</th>
            <th scope="col">Temperature</th>
            <th scope="col">Humidity</th>
            <th scope="col">Conditions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{weatherdata.city}, {weatherdata.country}</th>
            <td>{weatherdata.temperature}</td>
            <td>{weatherdata.description}</td>
            <td>{weatherdata.error}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchResult;
