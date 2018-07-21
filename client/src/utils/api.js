import axios from "axios";

export default {
    checkEmail: email => axios.get(`/api/users/create/?email=${email}`),
    checkUsername: username => axios.get(`/api/users/create/?username=${username}`),
    createUser: userInfo => axios.post("/api/users/create", userInfo),
    login: userInfo => axios.post("/api/users/login", userInfo),
    createJam: jamInfo => axios.post("/api/jams", jamInfo),
    getProfile: userId => axios.get(`/api/users/profile/?_id=${userId}`),
    updateProfile: (userId, updates) => axios.put(`/api/users/profile/?_id=${userId}`, updates), 
    getAllJams: () => axios.get("api/jams"),
    getMyJams: userId => axios.get("api/users/populated/"+userId),
    joinJamRequest: requestInfo => axios.post("api/jams/join", requestInfo),
    acceptJoinRequest: requestInfo => axios.put("api/jams/join/accept", requestInfo)
}

