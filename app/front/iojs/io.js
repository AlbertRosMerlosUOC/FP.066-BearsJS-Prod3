const socket = io();

class ioAPI {
  static init() {
    ioAPI.onTaskNotification();
    ioAPI.onError();
  }

  static onTaskNotification() {
    socket.on("taskNotification", (message) => {
      console.log("./taskNotification", message);
      alertify.success(message);
    });
  }

  static onError() {
    socket.on("error", (message) => {
      console.log("./server error", message);
      alertify.error(`server error: ${message}`);
    });
  }
}

ioAPI.init();

window.ioAPI = ioAPI;
