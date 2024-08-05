import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinAndLeave", ({ type, userName }) => {
      const message =
        type === "join"
          ? `${userName}님이 입장하셨습니다.`
          : `${userName}님이 퇴장하셨습니다.`;

      socket.broadcast.emit("joinAndLeave", {
        type: "info",
        message,
      });
    });

    socket.on("disconnect", () => {
      console.log("유저가 퇴장했습니다.");
    });

    socket.on("chat", (chatInfo) => {
      console.log("클라이언트에서 전송된 메세지입니다: ", chatInfo);

      io.emit("chat", chatInfo);
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
