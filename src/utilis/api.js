import axios from "axios";
const BASE_URL="https://api.themoviedb.org/3";
const WATCH_TOKEN=import.meta.env.VITE_APP_WATCH_TOKEN;
const headers={
    Authorization:"bearer "+WATCH_TOKEN,
}
export const fetchDatafromApi=async(url,params)=>{
     try{
        const {data}=await axios.get(BASE_URL + url,{headers,params});
      //   console.log(data);
        return data;
     }
     catch(err){
        console.log(err);
     }
}