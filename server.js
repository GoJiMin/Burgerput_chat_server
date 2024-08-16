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
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (userName) => {
      const message = `${userName}님이 입장하셨습니다.`;

      userList.set(socket.id, userName);

      socket.broadcast.emit("join", { type: "info", message });
    });

    socket.on("chat", (chatInfo) => {
      console.log("클라이언트에서 전송된 메세지입니다: ", chatInfo);

      io.emit("chat", chatInfo);
    });

    socket.on("disconnect", () => {
      const user = userList.get(socket.id);
      userList.delete(socket.id);

      const message = `${user}님이 퇴장했습니다.`;

      console.log(message);

      io.emit("leave", { type: "info", message });
    });
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
