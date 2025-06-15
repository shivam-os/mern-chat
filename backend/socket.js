import { Server as SocketIOServer } from "socket.io";
import { socketAuthenticate } from "./middlewares/authHandler.js";
import { Chat } from "./modules/chat/chat.model.js";

export const initSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //JWT middleware
  io.use(socketAuthenticate);

  io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData?.id);
      socket.emit("connected");
    });

    socket.on("join_chat", async (roomId) => {
      try {
        const chat = await Chat.findById(roomId);

        if (!chat) {
          return socket.emit("error", "Chat room does not exist.");
        }

        const isMember = chat.users.some(
          (u) => u.toString() === socket.user.id
        );

        if (!isMember) {
          return socket.emit("error", "You are not a member of this chat.");
        }

        socket.join(roomId);
      } catch (err) {
        console.error("Join chat error:", err.message);
        socket.emit("error", "Failed to join chat.");
      }
    });

    socket.on("send_message", (messageData) => {
      const { roomId } = messageData;
      io.to(roomId).emit("receive_message", messageData);
    });

    socket.on("disconnect", () => {});
  });

  return io;
};
