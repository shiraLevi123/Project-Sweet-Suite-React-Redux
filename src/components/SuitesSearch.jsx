
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSuites } from "../slice/suiteSlice";
import { useNavigate } from "react-router-dom";
import { setMySuite } from '../slice/suiteSlice';

import './SuitesSearch.css';

const SuitesSearch = () => {
  const [filters, setFilters] = useState({
    pool: false,
    jacuzzi: false,
    wifi: false,
    seaView: false,
    parking: false,
    airConditioning: false,
    kitchenFacilities: false,
    tv: false,
    numberBeds: 2,
  });
  const navigate = useNavigate(); // הגדרת הניתוב

  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  const handleSuiteSelection = (selectedSuite) => {
    dispatch(setMySuite(selectedSuite)); // עדכון Redux עם הסוויטה שנבחרה
  };

  const handleDiaryForm = (suiteId) => {
    navigate(`/diary-form/${suiteId}`); // ניתוב לדף יצירת יומן עם פרטי הסוויטה

  };


  const handleFilterChange = (event) => {
    console.log("Filters being sent: ", filters);
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSearch = async () => {
    const res = await dispatch(searchSuites(filters)); // שליחה של הסינונים ל-Redux
    console.log('res!!!!!', res);
    setSearchResults(res.payload);
  };


  const getRandomImageForSuite = (suite) => {
    const images = {
      pool: ["/images/pool/pool1.jpeg"],
      kitchenFacilities: ["/images/pool/pool1.jpeg"],
      parking: ["/images/parking/parking1.jpeg"],
      jacuzzi: ["/images/jacuzzi/jacuzzi (1).jpeg",
        "/images/jacuzzi/jacuzzi (1).jpeg",
        "/images/jacuzzi/jacuzzi (2).jpeg",
        "/images/jacuzzi/jacuzzi (3).jpeg",
        "/images/jacuzzi/jacuzzi (4).jpeg",
        "/images/jacuzzi/jacuzzi (5).jpeg",
        "/images/jacuzzi/jacuzzi (6).jpeg",
        "/images/jacuzzi/jacuzzi (7).jpeg",
        "/images/jacuzzi/jacuzzi (8).jpeg",
        "/images/jacuzzi/jacuzzi (9).jpeg",
        "/images/jacuzzi/jacuzzi (10).jpeg",
        "/images/jacuzzi/jacuzzi (11).jpeg",
        "/images/jacuzzi/jacuzzi (12).jpeg",
        "/images/jacuzzi/jacuzzi (13).jpeg",
        "/images/jacuzzi/jacuzzi (14).jpeg",
        "/images/jacuzzi/jacuzzi (15).jpeg",
        "/images/jacuzzi/jacuzzi (16).jpeg",
        "/images/jacuzzi/jacuzzi (17).jpeg",
        "/images/jacuzzi/jacuzzi (18).jpeg",
        "/images/jacuzzi/jacuzzi (19).jpeg",
        "/images/jacuzzi/jacuzzi (20).jpeg",
        "/images/jacuzzi/jacuzzi (21).jpeg",
        "/images/jacuzzi/jacuzzi (22).jpeg",
        "/images/jacuzzi/jacuzzi (23).jpeg",
        "/images/jacuzzi/jacuzzi (24).jpeg",
        "/images/jacuzzi/jacuzzi (25).jpeg",
        "/images/jacuzzi/jacuzzi (26).jpeg",
        "/images/jacuzzi/jacuzzi (27).jpeg",
        //   "/images/jacuzzi/jacuzzi (28).jpeg",
        //   "/images/jacuzzi/jacuzzi (29).jpeg",
        //   "/images/jacuzzi/jacuzzi (30).jpeg",
        //   "/images/jacuzzi/jacuzzi (31).jpeg",
        //   "/images/jacuzzi/jacuzzi (32).jpeg",
        //   "/images/jacuzzi/jacuzzi (33).jpeg",
        //   "/images/jacuzzi/jacuzzi (34).jpeg",
        //   "/images/jacuzzi/jacuzzi (35).jpeg",
        //   "/images/jacuzzi/jacuzzi (36).jpeg",
        //   "/images/jacuzzi/jacuzzi (37).jpeg",
        //   "/images/jacuzzi/jacuzzi (38).jpeg",
        //   "/images/jacuzzi/jacuzzi (39).jpeg",
        //   "/images/jacuzzi/jacuzzi (40).jpeg",
        //   "/images/jacuzzi/jacuzzi (41).jpeg",
        //   "/images/jacuzzi/jacuzzi (42).jpeg",
        //   "/images/jacuzzi/jacuzzi (43).jpeg",
        //   "/images/jacuzzi/jacuzzi (44).jpeg",
        //   "/images/jacuzzi/jacuzzi (45).jpeg",
        //   "/images/jacuzzi/jacuzzi (46).jpeg",
        //   "/images/jacuzzi/jacuzzi (47).jpeg",
        //   "/images/jacuzzi/jacuzzi (48).jpeg",
        //   "/images/jacuzzi/jacuzzi (49).jpeg",
        //   "/images/jacuzzi/jacuzzi (50).jpeg",
        //   "/images/jacuzzi/jacuzzi (51).jpeg",
        //   "/images/jacuzzi/jacuzzi (52).jpeg",
        //   "/images/jacuzzi/jacuzzi (53).jpeg",
      ],

      tv: [
        "/images/tv/tv.jpeg",
        "/images/tv/tv (1).jpeg",
        "/images/tv/tv (2).jpeg",
        "/images/tv/tv (3).jpeg",
        "/images/tv/tv (4).jpeg",
        "/images/tv/tv (5).jpeg",
        "/images/tv/tv (6).jpeg",
        "/images/tv/tv (7).jpeg",
        "/images/tv/tv (8).jpeg",
        "/images/tv/tv (9).jpeg",
        "/images/tv/tv (10).jpeg",
        "/images/tv/tv (11).jpeg",
        "/images/tv/tv (12).jpeg",
        "/images/tv/tv (13).jpeg",
        // "/images/tv/tv (14).jpeg",
        "/images/tv/tv (15).jpeg",
        "/images/tv/tv (16).jpeg"
      ],
      suite: ["/images/suite/suite1.jpeg"], // תמונות כלליות לסוויטות
      rooms: ["/images/rooms/room1.jpeg",], // תמונות חדרים
      shower: ["/images/shower/shower1.jpeg",], // תמונות מקלחת
    };

    const featureImages = [];

    // הוספת תמונה למאפיינים שונים אם הם TRUE
    if (suite.pool) featureImages.push(getRandomImageFromCategory(images.pool));
    if (suite.jacuzzi) featureImages.push(getRandomImageFromCategory(images.jacuzzi));
    if (suite.tv) featureImages.push(getRandomImageFromCategory(images.tv));
    if (suite.kitchenFacilities) featureImages.push(getRandomImageFromCategory(images.kitchen));
    if (suite.parking) featureImages.push(getRandomImageFromCategory(images.parking));

    // תמיד נבחר תמונה אחת מהסוויטה, חדרים ומקלחת
    const suiteImage = getRandomImageFromCategory(images.suite);
    const roomImage = getRandomImageFromCategory(images.rooms);
    const showerImage = getRandomImageFromCategory(images.shower);

    // החזרת כל התמונות
    return { featureImages, suiteImage, roomImage, showerImage };
  };

  // פונקציה עזר לבחירת תמונה רנדומלית מתוך קטגוריה
  const getRandomImageFromCategory = (categoryImages) => {
    if (categoryImages && categoryImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryImages.length);
      return categoryImages[randomIndex];
    }
    return null; // אם לא קיימות תמונות, נחזיר null
  };


  return (
    <div>
      <h3>Filter Suites</h3>
      <form onSubmit={handleSearch}>
        <div>
          <label>
            Jacuzzi:
            <input
              type="checkbox"
              name="jacuzzi"
              checked={filters.jacuzzi}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Pool:
            <input
              type="checkbox"
              name="pool"
              checked={filters.pool}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Sea View:
            <input
              type="checkbox"
              name="seaView"
              checked={filters.seaView}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Parking:
            <input
              type="checkbox"
              name="parking"
              checked={filters.parking}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Air Conditioning:
            <input
              type="checkbox"
              name="airConditioning"
              checked={filters.airConditioning}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Kitchen Facilities:
            <input
              type="checkbox"
              name="kitchenFacilities"
              checked={filters.kitchenFacilities}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            TV:
            <input
              type="checkbox"
              name="tv"
              checked={filters.tv}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            WIFI:
            <input
              type="checkbox"
              name="wifi"
              checked={filters.wifi}
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <div>
          <label>
            Number of Beds:
            <input
              type="number"
              name="numberBeds"
              min="2"
              max="4"
              value={filters.numberBeds}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </form>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 &&
        searchResults.map((suite) => {
          const { featureImages, suiteImage, roomImage, showerImage } = getRandomImageForSuite(suite);

          return (
            <div key={suite.id} className="suite-item">
              <h4>{suite.city}</h4>
              <p>{suite.address}</p>
              <p>Price per Night: ${suite.pricePerNight}</p>
              <p>{suite.beds} beds</p>
              <p>{suite.parking ? 'Has Parking' : 'No Parking'}</p>
              <p>{suite.pool ? 'Has Pool' : 'No Pool'}</p>
              <p>{suite.jacuzzi ? 'Has Jacuzzi' : 'No Jacuzzi'}</p>
              <p>{suite.airConditioning ? 'Has Air Conditioning' : 'No Air Conditioning'}</p>
              <p>{suite.kitchenFacilities ? 'Has Kitchen Facilities' : 'No Kitchen Facilities'}</p>
              <p>{suite.tv ? 'Has TV' : 'No TV'}</p>
              <p>{suite.wifi ? 'Has wifi' : 'No wifi'}</p>
              <p>{suite.seaView ? 'Has Sea View' : 'No Sea View'}</p>

              {suiteImage && <img src={suiteImage} alt="Suite" className="suite-image" />}
              {roomImage && <img src={roomImage} alt="Room" className="suite-image" />}
              {showerImage && <img src={showerImage} alt="Shower" className="suite-image" />}

              {featureImages.map((image, index) => (
                <img key={index} src={image} alt={`Feature ${index}`} className="suite-image" />
              ))}

              <button onClick={() => {
                handleDiaryForm(suite.id);
                handleSuiteSelection(suite);
              }}>
                Book This Suite
              </button>



            </div>

          );

        })}

    </div>
  );
};

export default SuitesSearch;