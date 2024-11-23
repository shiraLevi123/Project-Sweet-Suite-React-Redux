// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchSuites } from "../slice/suiteSlice";
// import './SuitesSearch.css';

// const SuitesSearch = () => {
//   const [filters, setFilters] = useState({
//     pool: false,
//     jacuzzi: false,
//     wifi: false,
//     seaView: false,
//     parking: false,
//     airConditioning: false,
//     kitchenFacilities: false,
//     tv: false,
//     wifi: false,
//     numberBeds: 1,
//   });

//   const dispatch = useDispatch();
//   const [searchResults, setSearchResults] = useState([]);
//   // const suites = useSelector((state) => state.suites || { searchResults: [], loading: true, error: null });
//   // const { searchResults, loading, error } = suites;


//   const handleFilterChange = (event) => {
//     console.log("Filters being sent: ", filters);
//     const { name, value, type, checked } = event.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSearch = async () => {
//     const res = await dispatch(searchSuites(filters)); // שליחה של הסינונים ל-Redux
//     console.log('res!!!!!', res);
//     setSearchResults(res.payload)

//   };

//   return (
//     <div>
//       <h3>Filter Suites</h3>
//       <div>
//         <label>
//           Jacuzzi:
//           <input
//             type="checkbox"
//             name="jacuzzi"
//             checked={filters.jacuzzi}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Pool:
//           <input
//             type="checkbox"
//             name="pool"
//             checked={filters.pool}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Sea View:
//           <input
//             type="checkbox"
//             name="seaView"
//             checked={filters.seaView}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Parking:
//           <input
//             type="checkbox"
//             name="parking"
//             checked={filters.parking}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Air Conditioning:
//           <input
//             type="checkbox"
//             name="airConditioning"
//             checked={filters.airConditioning}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Kitchen Facilities:
//           <input
//             type="checkbox"
//             name="kitchenFacilities"
//             checked={filters.kitchenFacilities}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           TV:
//           <input
//             type="checkbox"
//             name="tv"
//             checked={filters.tv}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//          WIFI:
//           <input
//             type="checkbox"
//             name="wifi"
//             checked={filters.wifi}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Number of Beds:
//           <input
//             type="number"
//             name="numberBeds"
//             min="1"
//             value={filters.numberBeds}
//             onChange={handleFilterChange}
//           />
//         </label>
//       </div>
//       <div>
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {/* {loading && <p>Loading...</p>} */}
//       {/* {error && <p>Error: {error}</p>} */}

//       {/* הצגת התוצאות */}
//       <div>
//         {/* !error && */}
//         {/* {searchResults.length === 0 && !loading && !error && <p>No suites found matching the filters.</p>} */}

//         {searchResults.length > 0 && searchResults.map((suite) => (
//           <div key={suite.id} className="suite-item">
//             <h4>{suite.city}</h4>
//             <p>{suite.address}</p>
//             <p>Price per Night: ${suite.pricePerNight}</p>
//             {/* <p>{suite.beds} beds</p> */}
//             <p>{suite.parking ? 'Has Parking' : 'No Parking'}</p>
//             <p>{suite.pool ? 'Has Pool' : 'No Pool'}</p>
//             <p>{suite.jacuzzi ? 'Has Jacuzzi' : 'No Jacuzzi'}</p>
//             <p>{suite.airConditioning ? 'Has Air Conditioning' : 'No Air Conditioning'}</p>
//             <p>{suite.kitchenFacilities ? 'Has Kitchen Facilities' : 'No Kitchen Facilities'}</p>
//             <p>{suite.tv ? 'Has TV' : 'No TV'}</p>
//             <p>{suite.wifi ? 'Has wifi' : 'No wifi'}</p>
//             <p>{suite.seaView ? 'Has Sea View' : 'No Sea View'}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuitesSearch;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchSuites } from "../slice/suiteSlice";
import { useNavigate } from "react-router-dom";
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
    numberBeds: 1,
  });

  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // הגדרת הניתוב

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

  const handleDiaryForm = (suiteId) => {
    navigate(`/diary-form/${suiteId}`); // ניתוב לדף יצירת יומן עם פרטי הסוויטה
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
            min="1"
            value={filters.numberBeds}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      
      </form>

      {/* שאר השדות פה */}
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* הצגת התוצאות */}
      <div>
        {searchResults.length > 0 && searchResults.map((suite) => (
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
            <button onClick={() => handleDiaryForm(suite.id)}>
              Book This Suite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuitesSearch;
