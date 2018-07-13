import axios from "axios";

export default {
    checkUsername: username => axios.get(`/api/users/create/${username}`),
    createUser: userInfo => axios.post("/api/users/create", userInfo)
}

