const { Server } = require("socket.io");

//!For Socket.io
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

//we get users from client when they are logged in
const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};
// const getUser = (receiverId) => {
//   return onlineUsers.find((user) => user.userId === receiverId);
// };

io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
    addNewUser(userId, socket.id);
    console.log("a user has been added!!");
    console.log(onlineUsers);
  });

  socket.on(
    "sendNotification",
    ({ senderName, senderId, senderProfilePicture, receiverId, type }) => {
      const receiver = getUser(receiverId);
      console.log(receiver);
      //   console.log(receiver.socketId);
      //   if (receiver == undefined) {
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        senderId,
        senderProfilePicture,
        type,
      });
      //   }
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("a user has left!!");
  });
});

io.listen(5000);
