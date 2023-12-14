import axios from "axios";
 

const instance = axios.create({
  // baseURL:' https://autoaid.onrender.com/',
 
    baseURL:'https://server.autoaid.online/',
    // baseURL:'http://localhost:4000/',

     
  });

  export default instance;