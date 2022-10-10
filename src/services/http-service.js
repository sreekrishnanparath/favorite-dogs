import axios from "axios";

export default axios.create({
    baseURL:"https://random.dog/",
    headers:{
        "Content-type":"application/json",
    }
});