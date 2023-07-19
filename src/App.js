import { useState } from "react";
import "./App.css";
import axios from "axios";
// import DevisionD from "./components/DivisionD";
import DivisionA from "./components/DivisionA";
function App() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const changeInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const onSubmitHandler = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${inputValue}`
      )
      .then((fetchedData) => {
        setData(fetchedData.data);
        console.log(fetchedData.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useState(() => {
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=Mumbai&aqi=no`
      )
      .then((fetchedData) => {
        // console.log(data);
        setData(fetchedData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return (
    <div className="App">
      {data && (
        <div>
          <div className="input__div">
            <input onChange={changeInputValue}></input>
            <button type="submit" onClick={onSubmitHandler}>
              Get Weather
            </button>
          </div>
          <div className="weather">
            <div>Location: {data.location.name}</div>
            <div>Country: {data.location.country}</div>
            <div>Condition: {data.current.condition.text}</div>
            <img src={data.current.condition.icon} alt="icon-of-weather"></img>
            <div>Temperature: {data.current.temp_c} Degree Celcius</div>
          </div>
          <section>
            {/* <DevisionD /> */}
            <DivisionA />
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
