import React from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = React.createContext<Socket>(io());