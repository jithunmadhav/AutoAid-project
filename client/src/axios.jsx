import axios from "axios";
 

const instance = axios.create({
    //  baseURL:'http://192.168.0.73:4000/',
    baseURL:'http://server.autoaid.online/',
     
  });

  export default instance;