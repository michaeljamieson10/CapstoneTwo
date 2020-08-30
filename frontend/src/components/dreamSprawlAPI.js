import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App.js"
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3020/api";

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
    } else if (verb === "delete") {
      q = axios.delete(
        `${BASE_URL}/${endpoint}`,  { params: { _token }});
    }else if (verb === "deleteadmin") {
      q = axios.delete(
        `${BASE_URL}/${endpoint}`,  {data: { _token }});
        // `${BASE_URL}/${endpoint}`,  { params: { _token }});
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
static async getUser(username){
try{
  const res = await this.request(`users/${username}`);
  console.log(res)
  // return res.result.resources
  } catch (err) {
  }
}
static async updateCurrentUser(username, data) {
  let res = await this.request(`users/${username}`,data,'patch');
  return res.user;
}

static async deleteUser(username){
  try{
    console.log(username)
    const res = await this.request(`users/${username}`,{},"delete");
    // console.log(res.result.resources)
    // return res.result.resources
    } catch (err) {
  }
}
static async deleteAvatar(username){
  try{
    console.log(username)

    const res = await this.request(`avatar/${username}`,{},"delete");
    // console.log(res.result.resources)
    // return res.result.resources
    } catch (err) {
  }
}
static async becomeAdmin(username){
  try{
    console.log(username)
    const res = await this.request(`admin/${username}`,{},"patch");
    // console.log(res.result.resources)
    // return res.result.resources
    } catch (err) {
  }
}
static async adminDeleteUser(username){
  try{
    console.log(username)
    const res = await this.request(`admin/${username}`,{},"deleteadmin");
    // console.log(res.result.resources)
    // return res.result.resources
    } catch (err) {
  }
}
}


export default dreamSprawlAPI;
