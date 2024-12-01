import React, { useEffect } from "react";
import { getAllSuites } from "../slice/suiteSlice";
import { useDispatch, useSelector } from "react-redux";
import "./SuiteDisplay.css";

const SuiteDisplay = () => {
  const dispatch = useDispatch();
  const { allSuites, loading } = useSelector((state) => state.suite);

  useEffect(() => {
    dispatch(getAllSuites());
  }, [dispatch]);

  if (loading) return <>הדף נטען...</>;

  // אם allSuites לא מערך, נסמן אותו ככזה
  const suites = Array.isArray(allSuites) ? allSuites : [];

  // פונקציה לבחירת תמונות רנדומליות לסוויטה
  // const getRandomImageForSuite = (suite) => {
  //   const images = {
  //     pool: ["/images/pool/pool1.jpeg"],
  //     kitchenFacilities: ["/images/pool/pool1.jpeg"],
  //     parking: ["/images/parking/parking1.jpeg"],
  //     jacuzzi: ["/images/jacuzzi/jacuzzi (1).jpeg",
  //     "/images/jacuzzi/jacuzzi (1).jpeg",
  //     "/images/jacuzzi/jacuzzi (2).jpeg",
  //     "/images/jacuzzi/jacuzzi (3).jpeg",
  //     "/images/jacuzzi/jacuzzi (4).jpeg",
  //     "/images/jacuzzi/jacuzzi (5).jpeg",
  //     "/images/jacuzzi/jacuzzi (6).jpeg",
  //     "/images/jacuzzi/jacuzzi (7).jpeg",
  //     "/images/jacuzzi/jacuzzi (8).jpeg",
  //     "/images/jacuzzi/jacuzzi (9).jpeg",
  //     "/images/jacuzzi/jacuzzi (10).jpeg",
  //     "/images/jacuzzi/jacuzzi (11).jpeg",
  //     "/images/jacuzzi/jacuzzi (12).jpeg",
  //     "/images/jacuzzi/jacuzzi (13).jpeg",
  //     "/images/jacuzzi/jacuzzi (14).jpeg",
  //     "/images/jacuzzi/jacuzzi (15).jpeg",
  //     "/images/jacuzzi/jacuzzi (16).jpeg",
  //     "/images/jacuzzi/jacuzzi (17).jpeg",
  //     "/images/jacuzzi/jacuzzi (18).jpeg",
  //     "/images/jacuzzi/jacuzzi (19).jpeg",
  //     "/images/jacuzzi/jacuzzi (20).jpeg",
  //     "/images/jacuzzi/jacuzzi (21).jpeg",
  //     "/images/jacuzzi/jacuzzi (22).jpeg",
  //     "/images/jacuzzi/jacuzzi (23).jpeg",
  //     "/images/jacuzzi/jacuzzi (24).jpeg",
  //     "/images/jacuzzi/jacuzzi (25).jpeg",
  //     "/images/jacuzzi/jacuzzi (26).jpeg",
  //     "/images/jacuzzi/jacuzzi (27).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (28).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (29).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (30).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (31).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (32).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (33).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (34).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (35).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (36).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (37).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (38).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (39).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (40).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (41).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (42).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (43).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (44).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (45).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (46).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (47).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (48).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (49).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (50).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (51).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (52).jpeg",
  //   //   "/images/jacuzzi/jacuzzi (53).jpeg",
  //   ],
      
  //     tv: [
  //       "/images/tv/tv.jpeg",
  //       "/images/tv/tv (1).jpeg",
  //       "/images/tv/tv (2).jpeg",
  //       "/images/tv/tv (3).jpeg",
  //       "/images/tv/tv (4).jpeg",
  //       "/images/tv/tv (5).jpeg",
  //       "/images/tv/tv (6).jpeg",
  //       "/images/tv/tv (7).jpeg",
  //       "/images/tv/tv (8).jpeg",
  //       "/images/tv/tv (9).jpeg",
  //       "/images/tv/tv (10).jpeg",
  //       "/images/tv/tv (11).jpeg",
  //       "/images/tv/tv (12).jpeg",
  //       "/images/tv/tv (13).jpeg",
  //       "/images/tv/tv (14).jpeg",
  //       "/images/tv/tv (15).jpeg",
  //       "/images/tv/tv (16).jpeg"
  //     ],
  //     suite: ["/images/suite/suite1.jpeg"], // תמונות כלליות לסוויטות
  //     rooms: ["/images/rooms/room1.jpeg",], // תמונות חדרים
  //     shower: ["/images/shower/shower1.jpeg",], // תמונות מקלחת
  //   };

  //   const featureImages = [];

  //   // הוספת תמונה למאפיינים שונים אם הם TRUE
  //   if (suite.pool) featureImages.push(getRandomImageFromCategory(images.pool));
  //   if (suite.jacuzzi) featureImages.push(getRandomImageFromCategory(images.jacuzzi));
  //   if (suite.tv) featureImages.push(getRandomImageFromCategory(images.tv));
  //   if (suite.kitchenFacilities) featureImages.push(getRandomImageFromCategory(images.kitchen));
  //   if (suite.parking) featureImages.push(getRandomImageFromCategory(images.parking));

  //   // תמיד נבחר תמונה אחת מהסוויטה, חדרים ומקלחת
  //   const suiteImage = getRandomImageFromCategory(images.suite);
  //   const roomImage = getRandomImageFromCategory(images.rooms);
  //   const showerImage = getRandomImageFromCategory(images.shower);

  //   // החזרת כל התמונות
  //   return { featureImages, suiteImage, roomImage, showerImage };
  // };

  // // פונקציה עזר לבחירת תמונה רנדומלית מתוך קטגוריה
  // const getRandomImageFromCategory = (categoryImages) => {
  //   if (categoryImages && categoryImages.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * categoryImages.length);
  //     return categoryImages[randomIndex];
  //   }
  //   return null; // אם לא קיימות תמונות, נחזיר null
  // };

  return (
    <div>
      <h1>סוויטות</h1>
      <div className="suites-container">
        {suites.map((suite) => {
          // const { featureImages, suiteImage, roomImage, showerImage } = getRandomImageForSuite(suite);

          return (
            <div className="suite-card" key={suite.id}>
              <h2>{suite.numberBeds}</h2>
              <p>דירוג: {suite.rating}</p>
              <p>מחיר ללילה: {suite.pricePerNight} ₪</p>
              <p>עיר: {suite.city}</p>
              <p>כתובת: {suite.address}</p>
{/* 
              {suiteImage && <img src={suiteImage} alt="סוויטה" className="suite-image" />}

              {roomImage && <img src={roomImage} alt="חדר" className="suite-image" />}

              {showerImage && <img src={showerImage} alt="מקלחת" className="suite-image" />}

              {featureImages.length > 0 ? (
                featureImages.map((image, index) => (
                  <img key={index} src={image} alt="מאפיין" className="suite-image" />
                ))
              ) : (
                <p>לא נמצאו תמונות עבור מאפיינים נוספים</p>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuiteDisplay;
