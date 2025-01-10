import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
});

// פונקציה לקבלת כל הסוויטות
export const getAllSuitesServer = async () => {
    const response = await axiosInstance.get("http://localhost:8080/api/suites");
    return response.data;
};

// פונקציה לחיפוש סוויטות לפי קריטריונים
export const searchSuitesServer = async (filters) => {
    const response = await axiosInstance.get("http://localhost:8080/api/suites/search", {
        params: filters // שולח את הקריטריונים מתוך React
    });
    return response.data;
};

// פונקציה למחיקת סוויטה לפי ID
export const deleteSuiteService = async (id) => {
    try {
        const response = await axiosInstance.delete(`http://localhost:8080/api/suites/${id}`);
        return response;
    } catch (error) {
        throw error; 
    }
};

//פונקציה להוספת סוויטה
export const addSuiteServer = async (formData) => {
    try {
        const response = await axiosInstance.post("http://localhost:8080/api/suites", formData)
        return response.data;
    } catch (error) {
        console.error("Failed to add suite");
    }
};