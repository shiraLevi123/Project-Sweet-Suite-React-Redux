import axios from "axios";

// פונקציה לקבלת כל הסוויטות
export const getAllSuitesServer = async () => {
    const response = await axios.get("http://localhost:8080/api/suites");
    return response.data;
};

// פונקציה לחיפוש סוויטות לפי קריטריונים
export const searchSuitesServer = async (filters) => {
    const response = await axios.get("http://localhost:8080/api/suites/search", {
        params: filters // שולח את הקריטריונים מתוך React
    });
    console.log("respone: "+response.data.city);
    return response.data;
};
