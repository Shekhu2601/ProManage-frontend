import axios from "axios";
import {AddTokenToHeader } from "../helper";
export function getAllTask() {
   const headers = AddTokenToHeader({ headers: {} });
    const res = axios.get(`${import.meta.env.VITE_BASE_URL}/api/task`,{
        headers
    }
    );
     if(res.status==401){
        localStorage.removeItem("token");
        alert("you are logged out")
        window.location ="/login"
    }
    return res;
}

export function fetchTaskById(id) {
      // return new Promise((resolve, reject) => {
    //     reject(new Error("Something went wrong"));
    // })
    const headers = AddTokenToHeader({ headers: {} });
    const res = axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/job/${id}`, {
        headers
    });
    return res;
}
export function taskcreate(data) {
    const headers = AddTokenToHeader({ headers: {} });
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/task/create`, data, {
        headers
    });
    return res;
}
export function editTask(data,id) {
    const headers = AddTokenToHeader({ headers: {} });
    const res = axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/job/${id}`, data, {
        headers
    });
    return res;
}
