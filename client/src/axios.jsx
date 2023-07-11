import axios from "axios";
 

const instance = axios.create({
    baseURL:'https://server.autoaid.online/',
     
  });

  export default instance;