import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";

function App() {
  const [place, setPlaces] = useState({
    place_name: "",
    address_name: "",
    place_url: "",
    place_lat: "",
    place_lng: "",
  });
  const myName = "name"; // 본인의 이름을 넣어주세요.

  const url = 'http://localhost:8000/place';

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url);
        const placeName = res.data['place_name'];
        const addr = res.data['address_name'];
        const placeURL = res.data['place_url'];
        const placeLat = res.data['y'];
        const placeLng = res.data['x'];

        console.log(res.data);
        setPlaces({
          place_name: placeName,
          address_name: addr,
          place_url: placeURL,
          place_lat: placeLat,
          place_lng: placeLng,
        });
      } catch (e) {
        console.error(e.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>{myName}의 최고 맛집을 소개합니다 😋</h1>
        <a href={place['place_url']}><h2>{place['place_name']}</h2></a>
        <h3>{place['address_name']}</h3>
        <h4>🥔 대파 감자 스프가 맛있어요 🍴</h4>
      </div>
      <div >
        <Map lat={place['place_lat']} lng={place['place_lng']} />
      </div>
    </div>
  );
}

export default App;
