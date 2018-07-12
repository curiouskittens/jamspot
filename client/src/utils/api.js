import axios from "axios";

export default {
    checkUsername: username => axios.get(`/api/user/create/${username}`),
    createUser: userInfo => axios.post("/api/user/create", userInfo)
}

