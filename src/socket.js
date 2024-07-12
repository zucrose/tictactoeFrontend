import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://socketprac.onrender.com/";
const URL1 = "http://localhost:3001";
export const socket = io(URL1, {
  autoConnect: false,
});
