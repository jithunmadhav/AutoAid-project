import axios from "axios";
 

const instance = axios.create({
    baseURL:'http://server.autoaid.online/',
     
  });

  export default instance;