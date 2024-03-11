import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Data from "./components/Data";
import Loader from "./components/Loader";
import axios from "axios";
import Notfound from "./components/Notfound";
import ThemeBtn from "./components/ThemeBtn";
import backgroundImage from "./assests/background.png"
import night from "./assests/night.png"

const App = () => {
  const [search, setSearch] = useState("Ahmedabad");
  const [datas, setDatas] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setLoading(true);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      let locationName;
      let weatherapi;
      try {

        const address = response.data.address;
        locationName = address.state_district.includes('District') ? address.state_district.replace(' District', '') : address.state_district;
        setSearch(locationName);
        weatherapi = await axios.get(`http://api.weatherapi.com/v1/current.json?key=61dfb61c8ab64b2aad7101226240703&aqi=no&q=${locationName}`);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
        setDatas(weatherapi);
      }
    }, () => {
      handleSubmit();
    });

    const time = new Date();
    const hour = time.getHours();

    if (hour > 18 || hour < 5) {
      document.body.style.backgroundImage = `url(${night})`;
    } else {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    }
  }, []);

  const handleSubmit = async (e = 1) => {
    if (e) e.preventDefault();
    if (search == "") {
      alert('done');
    } else {
      setLoading(true);

      const options = {
        method: 'GET',
        url: `http://api.weatherapi.com/v1/current.json?key=61dfb61c8ab64b2aad7101226240703&aqi=no&q=${search}`,
      };

      try {
        const response = await axios.request(options);
        setError(false);
        if (response.status == 404) {
          setDatas(response);
        }
        else if (response.status == 200) {
          setDatas(response);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className={`back ${dark && "back-dark"}`}>
        <ThemeBtn dark={dark} setDark={setDark} />
        <div className="formcontrol">
          <SearchBar
            search={search}
            setSearch={setSearch}
            handleSubmit={handleSubmit}
            dark={dark}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          datas && !error && <Data datas={datas} dark={dark} />
        )}
        {error && !loading && <Notfound />}
      </div>
    </>
  );
};

export default App;
