import axios from "axios"
import { baseUrl } from "../../api/baseUrl"



export const organizerServices = async () => {
    const response = axios.post(`${baseUrl}/agent/organisers`)
}