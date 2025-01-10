import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
});

//קבלת לקוח עם ID
export const getAllCustomer = async () => {

    const response = await axiosInstance.get("http://localhost:8080/api/customer/all")
    return response;
};

// פעולה לרישום
export const postCustomer = async (formData) => {

    try {
        const response = await axiosInstance.post("http://localhost:8080/api/customer/signup", formData
            , {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error, ' serviceשגיאה ברישום לקוח');
    }

};

// פעולה לכניסה
export const loginCustomer = async (loginData) => {
    try {
        const response = await axiosInstance.post("http://localhost:8080/api/customer/login", loginData);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};
//הוצאת לקוח
export const signoutService = async () => {
    try {
        const response = await axiosInstance.post("http://localhost:8080/api/customer/signout")
        return response.status;
    } catch (error) {
        throw error.status;
    }
};
//עדכון לקוח
export const updateCustomer = async (formData, id) => {
    // customerData.id = id;

    const response = await axiosInstance.put(`http://localhost:8080/api/customer/updateCustomer/${id}`, formData);
    return response.data;
}

