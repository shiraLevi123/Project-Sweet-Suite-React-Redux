import axios from "axios";

axios.get(`http://localhost:8080/api/suites/${suiteId}`)
  .then(response => {
    console.log(response.data);  // הדפס את התגובה לקבלת מבט על המידע המתקבל
    setSuite(response.data);
  })
  .catch(error => {
    console.error('Error fetching suite:', error);
  });