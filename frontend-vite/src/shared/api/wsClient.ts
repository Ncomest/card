import { URL } from "@/shared/lib/constants/consts";

type WsEventHandler<T = unknown> = (payload: T) => void;

type MessageEnvelope = {
  event?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const listeners = new Map<string, Set<WsEventHandler>>();

let socket: WebSocket | null = null;
let isConnecting = false;
const messageQueue: MessageEnvelope[] = [];

const WS_URL = (() => {
  const httpUrl = URL;

  if (httpUrl.startsWith("https://")) {
    return `wss://${httpUrl.slice("https://".length)}/websocket`;
  }

  if (httpUrl.startsWith("http://")) {
    return `ws://${httpUrl.slice("http://".length)}/websocket`;
  }

  return `ws://${httpUrl}/websocket`;
})();

function flushQueue() {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  while (messageQueue.length > 0) {
    const msg = messageQueue.shift();
    if (!msg) continue;
    socket.send(JSON.stringify(msg));
  }
}

function handleMessage(raw: MessageEvent) {
  try {
    const data: MessageEnvelope = JSON.parse(raw.data);
    const event = data.event;

    if (!event) return;

    const handlers = listeners.get(event);
    if (!handlers || handlers.size === 0) return;

    handlers.forEach((handler) => handler(data));
  } catch (error) {
    console.error("Invalid WebSocket message", error);
  }
}

function ensureSocket() {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  if (isConnecting) return;

  isConnecting = true;

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    isConnecting = false;
    flushQueue();
  };

  socket.onmessage = handleMessage;

  socket.onclose = () => {
    socket = null;
    // простейший реконнект
    setTimeout(() => {
      isConnecting = false;
      if (listeners.size > 0) {
        ensureSocket();
      }
    }, 1000);
  };

  socket.onerror = () => {
    console.error("WebSocket connection error");
  };
}

export function sendWs(message: MessageEnvelope) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    messageQueue.push(message);
    ensureSocket();
    return;
  }

  socket.send(JSON.stringify(message));
}

export function subscribeWs<T = unknown>(
  event: string,
  handler: WsEventHandler<T>,
): () => void {
  let eventListeners = listeners.get(event);

  if (!eventListeners) {
    eventListeners = new Set();
    listeners.set(event, eventListeners);
  }

  eventListeners.add(handler as WsEventHandler);

  ensureSocket();

  return () => {
    const current = listeners.get(event);
    if (!current) return;

    current.delete(handler as WsEventHandler);

    if (current.size === 0) {
      listeners.delete(event);
    }
  };
}
