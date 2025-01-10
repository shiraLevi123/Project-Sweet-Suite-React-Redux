import axios from "axios";
const axiosInstance = axios.create({
    withCredentials: true,
});

export const addReview = async (review) => {
    const response = await axiosInstance.post("http://localhost:8080/api/review",review);
    return response.data;
};
export const getAllReview = async () => {
    const response = await axiosInstance.get("http://localhost:8080/api/review");
    return response.data;
};
