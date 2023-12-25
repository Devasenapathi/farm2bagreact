import axios from "axios";
import { BANNERAPI } from "../utils/api";
import { BASE_AUTH } from "../utils/base_auth";

export function bannerService(){
    return axios.get(BANNERAPI,{
        headers:{
            Authorization:BASE_AUTH,
            "Content-Type":"application/json"
        }
    })
}