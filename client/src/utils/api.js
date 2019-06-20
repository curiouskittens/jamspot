import axios from "axios";

export default {
  checkEmail: email => axios.get(`/api/users/create/?email=${email}`),
  checkUsername: username =>
    axios.get(`/api/users/create/?username=${username}`),
  createUser: userInfo => axios.post("/api/users/create", userInfo),
  login: userInfo => axios.post("/api/users/login", userInfo),

  populateHomePage: userId => axios.get(`/api/users/home/?id=${userId}`),
  getNotifications: userId =>
    axios.get(`/api/users/get/notification/?_id=${userId}`),
  pullNotifications: userInfo =>
    axios.put("/api/users/pull/notifications", userInfo),

  createJam: jamInfo => axios.post("/api/jams", jamInfo),

  getProfile: userId => axios.get(`/api/users/profile/?_id=${userId}`),
  updateProfile: (userId, updates) =>
    axios.put(`/api/users/profile/?_id=${userId}`, updates),
  getProfileView: username =>
    axios.get(`/api/users/profile/?username=${username}`),

  getAllJams: () => axios.get("api/jams"),
  getMyJams: userId => axios.get("api/users/populated/" + userId),
  joinJamRequest: requestInfo =>
    axios.put("/api/jams/join/request", requestInfo),
  acceptJoinRequest: requestInfo =>
    axios.put("/api/jams/join/accept", requestInfo),
  declineJoinRequest: requestInfo =>
    axios.put("/api/jams/join/decline", requestInfo),
  getOneJamById: jamId => axios.get(`/api/jams/${jamId}`),

  addPost: postInfo => axios.post("/api/posts", postInfo)
};
