import React from 'react';
import { ChatManager } from '../components/game/websocket';

function substituteHost(s: string): string {
  return s.replace('myhost', document.location.host).replace('myprotocol', document.location.protocol === 'http:' ? 'ws:' : 'wss:');
}

export default function WebsocketPage() {
  return (
        <ChatManager socketUrl={substituteHost(process.env.REACT_APP_BACKEND_URL || 'ws://localhost:8090/chat')} />
  );
}

