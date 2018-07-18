import axios from "axios";

export default {
    checkUsername: username => axios.get(`/api/users/create/?username=${username}`),
    createUser: userInfo => axios.post("/api/users/create", userInfo),
    login: userInfo => axios.post("/api/users/login", userInfo),
    createJam: jamInfo => axios.post("/api/jams", jamInfo),
    getProfile: userId => axios.get(`/api/users/profile/?_id=${userId}`),
    getAllJams: () => axios.get("api/jams"),
    joinJamRequest: requestInfo => axios.post("api/jams/join", requestInfo)
}

