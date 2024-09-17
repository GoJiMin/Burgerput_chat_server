import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8080;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const userList = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: [
        process.env.BURGERPUT_SITE_1,
        process.env.BURGERPUT_SITE_2,
        "http://localhost:3000",
      ],
      methods: ["GET", "POST"],
    },
  });

  const handleJoin = (socket, userName) => {
    const message = `${userName}님이 입장하셨습니다.`;

    userList.set(socket.id, userName);

    socket.broadcast.emit("join", { type: "info", message });
  };

  const handleChat = (chatInfo) => {
    io.emit("chat", chatInfo);
  };

  const handleDisconnect = (socket) => {
    const user = userList.get(socket.id);

    if (user) {
      userList.delete(socket.id);

      const message = `${user}님이 퇴장했습니다.`;

      io.emit("leave", { type: "info", message });
    } else {
      console.error(`소켓 ID: ${socket.id}가 userList에 존재하지 않습니다.`);
    }
  };

  io.on("connection", (socket) => {
    socket.on("join", (userName) => handleJoin(socket, userName));

    socket.on("chat", handleChat);

    socket.on("disconnect", () => handleDisconnect(socket));
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
