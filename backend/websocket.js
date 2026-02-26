const WebSocket = require("ws");

let wss = null;

/**
 * Initialize WebSocket server on top of existing HTTP server.
 * Attaches chat handling and allows other modules to broadcast events.
 *
 * @param {import("http").Server} server
 */
function initWebSocket(server) {
  if (wss) {
    return wss;
  }

  wss = new WebSocket.Server({ server, path: "/websocket" }, () => {
    console.log("WebSocket server started on /websocket");
  });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const parsed = JSON.parse(message);
        handleIncomingMessage(parsed);
      } catch (err) {
        console.error("Invalid WebSocket message", err);
      }
    });
  });

  return wss;
}

function handleIncomingMessage(message) {
  switch (message.event) {
    case "message":
    case "connection":
      broadcast(message);
      break;
    default:
      // Unknown event type – ignore for now
      break;
  }
}

/**
 * Low-level broadcast of a prepared message object.
 * The object will be JSON.stringified before sending.
 */
function broadcast(message) {
  if (!wss) return;

  const payload = JSON.stringify(message);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

/**
 * Helper to broadcast a structured event with payload.
 *
 * @param {string} event
 * @param {object} payload
 */
function broadcastEvent(event, payload = {}) {
  broadcast({ event, ...payload });
}

module.exports = {
  initWebSocket,
  broadcast,
  broadcastEvent,
};

