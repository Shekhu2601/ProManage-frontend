export function AddTokenToHeader({ headers }) {
    const token = localStorage.getItem("token");
    if (token) {
        headers.Authorization = `${token}`;
    }
    return headers;
}
export function handleApiResponse(res) {
    switch (res?.response?.status) {
        case 401:
            localStorage.removeItem("token");
            alert("You're logged out");
            window.location.href = "/login";
            return null;
        case 400:
            alert("Invalid email or password");
            return null;
        case 200:
            alert("Registered successfully");
            return res.data;
       
        case 500:
            alert("Something went wrong");
            return null;
        default:
            alert("Something went wrong");
            break;
    }
}

import { decodeToken } from 'react-jwt';
export function isEditable(id){
    const token= localStorage.getItem("token")
    if(!token){
        return false;
    }
    const decoded =decodeToken(token)
    console.log(decoded)
    return decoded.id == id
   } 
   