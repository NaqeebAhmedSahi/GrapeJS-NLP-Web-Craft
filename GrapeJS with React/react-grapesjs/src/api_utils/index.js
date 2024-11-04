import axios from "axios";
export const API_HOST = "http://localhost:8080/pages";

export const create_page = async (name) => {
    try {
        const response = await axios.post(`${API_HOST}`,{name});
        return response.data;
    } catch(error){
        console.log("Error",error);
    }
};