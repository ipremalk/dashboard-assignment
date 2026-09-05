import { useEffect, useState, useCallback, useRef } from 'react';
import { websocketClient } from '@api/client/websocketClient';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);
  const messageHandlers = useRef(new Set());

  useEffect(() => {
    setConnectionStatus('connecting');
    websocketClient.connect();

    const handleOpen = () => {
      setIsConnected(true);
      setConnectionStatus('connected');
    };

    const handleClose = () => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };

    const handleError = () => {
      setConnectionStatus('error');
    };

    const handleMessage = (data) => {
      setLastMessage(data);
      messageHandlers.current.forEach((handler) => {
        try {
          handler(data);
        } catch (error) {
          console.error('[useWebSocket] Handler error', error);
        }
      });
    };

    websocketClient.on('open', handleOpen);
    websocketClient.on('close', handleClose);
    websocketClient.on('error', handleError);
    websocketClient.on('message', handleMessage);

    return () => {
      websocketClient.off('open', handleOpen);
      websocketClient.off('close', handleClose);
      websocketClient.off('error', handleError);
      websocketClient.off('message', handleMessage);
      websocketClient.disconnect();
    };
  }, []);

  const subscribe = useCallback((handler) => {
    messageHandlers.current.add(handler);
    return () => {
      messageHandlers.current.delete(handler);
    };
  }, []);

  const send = useCallback((data) => {
    websocketClient.send(data);
  }, []);

  return {
    isConnected,
    connectionStatus,
    lastMessage,
    subscribe,
    send,
  };
};

export default useWebSocket;
