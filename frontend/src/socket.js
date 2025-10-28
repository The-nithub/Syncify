// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://syncify-1.onrender.com"); // your backend URL
export default socket;
