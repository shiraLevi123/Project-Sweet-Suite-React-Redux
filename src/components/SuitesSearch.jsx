import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSuites } from "../slice/suiteSlice";
import { useNavigate } from "react-router-dom";
import { setMySuite } from '../slice/suiteSlice';
import './SuitesSearch.css';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

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
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  const handleSuiteSelection = (selectedSuite) => {
    dispatch(setMySuite(selectedSuite));
  };

  const handleDiaryForm = (suiteId) => {
    navigate(`/diary-form/${suiteId}`);

  };


  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSearch = async () => {
    const res = await dispatch(searchSuites(filters));
    setSearchResults(res.payload);
  };


  const getRandomImageForSuite = (suite) => {
    const images = {
      pool: [
        "/images/pool/pool.jpeg",
        "/images/pool/pool (1).jpeg",
        "/images/pool/pool (2).jpeg",
        "/images/pool/pool (3).jpeg",
        "/images/pool/pool (4).jpeg",
        "/images/pool/pool (5).jpeg",
        "/images/pool/pool (6).jpeg",
        "/images/pool/pool (7).jpeg",
        "/images/pool/pool (8).jpeg",
        "/images/pool/pool (9).jpeg",
        "/images/pool/pool (10).jpeg",
        "/images/pool/pool (11).jpeg",
        "/images/pool/pool (12).jpeg",
        "/images/pool/pool (13).jpeg",
        "/images/pool/pool (14).jpeg",
        "/images/pool/pool (15).jpeg",
        "/images/pool/pool (16).jpeg",
        "/images/pool/pool (17).jpeg",
        "/images/pool/pool (18).jpeg",
        "/images/pool/pool (19).jpeg",
        "/images/pool/pool (20).jpeg",
        "/images/pool/pool (21).jpeg",
        "/images/pool/pool (22).jpeg",],


      kitchenFacilities: [
        "/images/kitchen/kitchen (1).jpeg",
        "/images/kitchen/kitchen (2).jpeg",
        "/images/kitchen/kitchen (3).jpeg",
        "/images/kitchen/kitchen (4).jpeg",
        "/images/kitchen/kitchen (5).jpeg",
        "/images/kitchen/kitchen (6).jpeg",
        "/images/kitchen/kitchen (7).jpeg",
        "/images/kitchen/kitchen (8).jpeg",
        "/images/kitchen/kitchen (9).jpeg",
        "/images/kitchen/kitchen (10).jpeg",
        "/images/kitchen/kitchen (11).jpeg",
        "/images/kitchen/kitchen (12).jpeg",
        "/images/kitchen/kitchen (13).jpeg",
        "/images/kitchen/kitchen (14).jpeg",
        "/images/kitchen/kitchen (15).jpeg",
        "/images/kitchen/kitchen (16).jpeg",
        "/images/kitchen/kitchen (17).jpeg",
        "/images/kitchen/kitchen (18).jpeg",
        "/images/kitchen/kitchen (19).jpeg",
        "/images/kitchen/kitchen (20).jpeg",
        "/images/kitchen/kitchen (21).jpeg",
        "/images/kitchen/kitchen (22).jpeg",
        "/images/kitchen/kitchen (23).jpeg",
        "/images/kitchen/kitchen (24).jpeg",
        "/images/kitchen/kitchen (25).jpeg",
        "/images/kitchen/kitchen (26).jpeg",
        "/images/kitchen/kitchen (27).jpeg",
        "/images/kitchen/kitchen (28).jpeg",
        "/images/kitchen/kitchen (29).jpeg",
        "/images/kitchen/kitchen (30).jpeg",
        "/images/kitchen/kitchen (31).jpeg",
        "/images/kitchen/kitchen (32).jpeg",
        "/images/kitchen/kitchen (33).jpeg",
        "/images/kitchen/kitchen (34).jpeg",
        "/images/kitchen/kitchen (35).jpeg",
        "/images/kitchen/kitchen (36).jpeg",
        "/images/kitchen/kitchen (37).jpeg",
        "/images/kitchen/kitchen (38).jpeg",
        "/images/kitchen/kitchen (39).jpeg",
      ],
      parking: [
        "/images/parking/parking (1).jpeg",
        "/images/parking/parking (2).jpeg"],

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
        "/images/tv/tv (14).jpeg",
        "/images/tv/tv (15).jpeg",
      ],

      suite: [
        "/images/suite/suite (1).jpeg",
        "/images/suite/suite (2).jpeg",
        "/images/suite/suite (3).jpeg",
        "/images/suite/suite (4).jpeg",
        "/images/suite/suite (5).jpeg",
        "/images/suite/suite (6).jpeg",
        "/images/suite/suite (7).jpeg",
        "/images/suite/suite (8).jpeg",
        "/images/suite/suite (9).jpeg",
        "/images/suite/suite (10).jpeg",
        "/images/suite/suite (11).jpeg",
        "/images/suite/suite (12).jpeg",
        "/images/suite/suite (13).jpeg",
        "/images/suite/suite (14).jpeg",
        "/images/suite/suite (15).jpeg",
        "/images/suite/suite (16).jpeg",
        "/images/suite/suite (17).jpeg",
        "/images/suite/suite (18).jpeg",
        "/images/suite/suite (19).jpeg",
        "/images/suite/suite (20).jpeg",
        "/images/suite/suite (21).jpeg",
        "/images/suite/suite (22).jpeg",
        "/images/suite/suite (23).jpeg",
        "/images/suite/suite (24).jpeg",
        "/images/suite/suite (25).jpeg",
        "/images/suite/suite (26).jpeg",
        "/images/suite/suite (27).jpeg",
      ],

      rooms: [
        "/images/rooms/rooms (1).jpeg",
        "/images/rooms/rooms (2).jpeg",
        "/images/rooms/rooms (3).jpeg",
        "/images/rooms/rooms (4).jpeg",
        "/images/rooms/rooms (5).jpeg",
        "/images/rooms/rooms (6).jpeg",
        "/images/rooms/rooms (7).jpeg",
        "/images/rooms/rooms (8).jpeg",
        "/images/rooms/rooms (9).jpeg",
        "/images/rooms/rooms (10).jpeg",
        "/images/rooms/rooms (11).jpeg",
        "/images/rooms/rooms (12).jpeg",
        "/images/rooms/rooms (13).jpeg",
        "/images/rooms/rooms (14).jpeg",
        "/images/rooms/rooms (15).jpeg",
        "/images/rooms/rooms (16).jpeg",
        "/images/rooms/rooms (17).jpeg",
        "/images/rooms/rooms (18).jpeg",
      ],

      shower: [
        "/images/shower/shower (1).jpeg",
        "/images/shower/shower (2).jpeg",
        "/images/shower/shower (3).jpeg",
        "/images/shower/shower (4).jpeg",
        "/images/shower/shower (5).jpeg",
        "/images/shower/shower (6).jpeg",
        "/images/shower/shower (7).jpeg",
        "/images/shower/shower (8).jpeg",
        "/images/shower/shower (9).jpeg",
        "/images/shower/shower (10).jpeg",
        "/images/shower/shower (11).jpeg",
        "/images/shower/shower (12).jpeg",
        "/images/shower/shower (13).jpeg",
        "/images/shower/shower (14).jpeg",
        "/images/shower/shower (15).jpeg",
        "/images/shower/shower (16).jpeg",
        "/images/shower/shower (17).jpeg",
        "/images/shower/shower (18).jpeg",
        "/images/shower/shower (19).jpeg",
        "/images/shower/shower (20).jpeg",
        "/images/shower/shower (21).jpeg",
        "/images/shower/shower (22).jpeg",
        "/images/shower/shower (23).jpeg",
        "/images/shower/shower (24).jpeg",
        "/images/shower/shower (25).jpeg",
        "/images/shower/shower (26).jpeg",
        "/images/shower/shower (27).jpeg",
        "/images/shower/shower (28).jpeg",
        "/images/shower/shower (29).jpeg",
        "/images/shower/shower (30).jpeg",
        "/images/shower/shower (31).jpeg",
        "/images/shower/shower (32).jpeg",
        "/images/shower/shower (33).jpeg",
        "/images/shower/shower (34).jpeg",
      ],
    };

    const featureImages = [];

    if (suite.pool) featureImages.push(getRandomImageFromCategory(images.pool));
    if (suite.jacuzzi) featureImages.push(getRandomImageFromCategory(images.jacuzzi));
    if (suite.tv) featureImages.push(getRandomImageFromCategory(images.tv));
    if (suite.kitchenFacilities) featureImages.push(getRandomImageFromCategory(images.kitchenFacilities));
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
    return null;
  };


  return (
    <div>
      <h3>בחר את הסוויטה המושלמת</h3>
      <br></br>
      <form onSubmit={handleSearch} className="middleDir">
        <div>
          <label>
            ג'קוזי
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-jacuzzi"
                  type="checkbox"
                  name="jacuzzi"
                  checked={filters.jacuzzi}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-jacuzzi"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            בריכה
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-pool"
                  type="checkbox"
                  name="pool"
                  checked={filters.pool}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-pool"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            נוף מרהיב לים
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-seaView"
                  type="checkbox"
                  name="seaView"
                  checked={filters.seaView}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-seaView"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            חניה מרווחת
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-parking"
                  type="checkbox"
                  name="parking"
                  checked={filters.parking}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-parking"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            מזגן
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-airConditioning"
                  type="checkbox"
                  name="airConditioning"
                  checked={filters.airConditioning}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-airConditioning"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            מטבח מאובזר
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-kitchenFacilities"
                  type="checkbox"
                  name="kitchenFacilities"
                  checked={filters.kitchenFacilities}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-kitchenFacilities"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            טלוויזיה
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-tv"
                  type="checkbox"
                  name="tv"
                  checked={filters.tv}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-tv"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            WIFI
            <div className="checkbox-wrapper-5">
              <div className="check">
                <input
                  id="check-wifi"
                  type="checkbox"
                  name="wifi"
                  checked={filters.wifi}
                  onChange={handleFilterChange}
                />
                <label htmlFor="check-wifi"></label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="numberBeds">מספר מיטות</InputLabel>
            <Input
              type="number"
              id="numberBeds"
              name="numberBeds"
              value={filters.numberBeds}
              onChange={handleFilterChange}
              inputProps={{
                min: 2,
                max: 4,
                step: 2,
              }}
            />
            <FormHelperText>בחר בין 2 ל-4 מיטות</FormHelperText>
          </FormControl>
        </div>
      </form>
      <div>
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#B3E5FC',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4fc3f7'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#B3E5FC'}
        >
          סנן עבורי
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>

      {searchResults.length > 0 &&
        searchResults.map((suite) => {
          const { featureImages, suiteImage, roomImage, showerImage } = getRandomImageForSuite(suite);

          return (
            <div key={suite.id} className="suite-card">
              <h4>אנחנו ממוקמים ב{suite.city}</h4>
              <p>כתובת: {suite.address}</p>
              <p>מחיר ללילה: ₪{suite.pricePerNight}</p>
              <p>{suite.numberBeds} מיטות</p>
              <p>{suite.parking ? 'חניה מרווחת' : 'ללא חניה'}</p>
              <p>{suite.pool ? 'בריכה מפנקת' : 'ללא בריכה'}</p>
              <p>{suite.jacuzzi ? 'ג`קוזי מחומם' : 'ללא ג`קוזי'}</p>
              <p>{suite.airConditioning ? 'מזגן' : 'ללא מזגן'}</p>
              <p>{suite.kitchenFacilities ? 'מטבח מרווח' : 'ללא מטבח'}</p>
              <p>{suite.tv ? 'טלוויזה' : 'ללא טלווזיה'}</p>
              <p>{suite.wifi ? 'wifi' : 'wifi ללא '}</p>
              <p>{suite.seaView ? 'נוף מרהיב לים' : 'לא בקרבת ים'}</p>

              <div className="suite-images-container">
                {suiteImage && <img src={suiteImage} alt="Suite" className="suite-image" />}
                {roomImage && <img src={roomImage} alt="Room" className="suite-image" />}
                {showerImage && <img src={showerImage} alt="Shower" className="suite-image" />}

                {featureImages.map((image, index) => (
                  <img key={index} src={image} alt={`Feature ${index}`} className="suite-image" />
                ))}
              </div>


              <button
                onClick={() => {
                  handleDiaryForm(suite.id);
                  handleSuiteSelection(suite);
                }}
                style={{
                  backgroundColor: '#B3E5FC',
                  color: '#fff',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4fc3f7'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#B3E5FC'}
              >
                אהבתי את הסוויטה אני רוצה לקבוע תאריך
              </button>

            </div>

          );
        })

      }
    </div>
  );

};

export default SuitesSearch;