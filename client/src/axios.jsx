import axios from "axios";
 

const instance = axios.create({
    // baseURL:'http://192.168.133.127:4000/',
    baseURL:'http://localhost:4000',
     
  });

  export default instance;