import React, { useState, useEffect } from "react";
import Select from "react-select";
import {State, City} from "country-state-city";

export default function App() {
  const [state, setState] = useState("")
  const [city, setCity] = useState("")


  const updatedStates = (countryId) =>
    State
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));
  const updatedCities = (countryId, stateId) =>
    City
      .getCitiesOfState(countryId, stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  useEffect(() => {console.log(state)}, [state]);

  return (
    <div className="App">
        <Select
          id="state"
          name="state"
          options={updatedStates("IN")}
          // value={state.label}
          onChange={(value) => {
            setState(value);
            console.log(value.name)
          }}
        />
        <Select
          id="city"
          name="city"
          options={updatedCities("IN", state.isoCode)}
          // value={city.name}
          onChange={(value) => { 
            setCity(value);
            console.log(value.name)
          }}
        />
        <div onClick={() => window.location.reload(false)}>
        <button type="submit" >Submit</button>
        </div>
        
        {/* <p>{JSON.stringify(csc.get)}</p> */}
    </div>
  );
}

