import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App.js"
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3020";

class dreamSprawlAPI {
  static async request(endpoint, params = {}, verb = "get") {

    let _token = localStorage.getItem('user');
    // let _token = localStorage.getItem('TOKEN_STORAGE_ID');

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/api/${endpoint}`, { params: { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/api/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/api/${endpoint}`, { _token, ...params });
    } else if (verb === "delete") {
      q = axios.delete(
        `${BASE_URL}/api/${endpoint}`,  { params: { _token }});
    }else if (verb === "deleteadmin") {
      q = axios.delete(
        `${BASE_URL}/api/${endpoint}`,  {data: { _token }});
        
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
/**
 * MAKES AN API CALL TO CLOUDINARY API
 * then gets all of the choices for body parts
 * we return the results and this populates the choices on 
 */
  static async getAvatarChoices(username){
  try{
    const res = await this.request(`avatar/dress`,{username});
    console.log(res.result.resources)
    const cloudName = 'dreamsprawl';
    return res.result.resources
    } catch (err) {
    }
}

/** 
 * sends data to patch user
 */
static async updateCurrentUser(username, data) {
  let res = await this.request(`users/${username}`,data,'patch');
  return res.user;
}
/**
 * Deletes user
 */
static async deleteUser(username){
  try{
    await this.request(`users/${username}`,{},"delete");
    } catch (err) {
  }
}
/**
 * this is called after deleting user 
 */
static async deleteAvatar(username){
  try{
     await this.request(`avatar/${username}`,{},"delete");
    } catch (err) {
  }
}
/**
 * patches  the admin to true to the user by the username param
 */
static async becomeAdmin(username){
  try{
    await this.request(`admin/${username}`,{},"patch");
    } catch (err) {
  }
}
/**
 * deletes user via admin route, user must be an admin in order to delete
 * delete other users
 */
static async adminDeleteUser(username){
  try{
    await this.request(`admin/${username}`,{},"deleteadmin");
    } catch (err) {
  }
}
}


export default dreamSprawlAPI;
