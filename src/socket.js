import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://socketprac.onrender.com/";

export const socket = io(URL, {
  autoConnect: false,
});
