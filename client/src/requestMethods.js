import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmVjNGNlY2ZhYmE5MjMxY2NkOTcyOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDY0OTUyMiwiZXhwIjoxNjM0OTA4NzIyfQ.boernoDrCghFp3qipzRS2fqxXfJvERH3_5Zq36Jw-sk";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

export const saveRequest = async (username) => {
  const res = await publicRequest.post("/users/add-user", { username: username });
  return res;
};

export const updateUser = async (count, id) => {
  try {
    const res = await publicRequest.put(`/users/update-user/${id}`, { ended: count });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async () => {
  const res = await publicRequest.get("/users/all");
  return res;
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
