import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App.js"

const BASE_URL = process.env.BASE_URL || "http://localhost:3020/api";

class dreamSprawlAPI {
  static async request(endpoint, params = {}, verb = "get") {

    let _token = localStorage.getItem('user');
    // let _token = localStorage.getItem('TOKEN_STORAGE_ID');

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getAvatarChoices(username){
  try{
    const res = await this.request(`avatar/dress`,{username});
    console.log(res.result.resources)
    const cloudName = 'dreamsprawl';
    return res.result.resources
    } catch (err) {
    }
}


}


export default dreamSprawlAPI;
