
import axios from "axios";
import {AddTokenToHeader } from "../helper";
import { useParams } from "react-router-dom";

export function boardM(data) {
    const headers = AddTokenToHeader({ headers: {} });
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/board/added`, data, {
        headers
    });
    return res;
}