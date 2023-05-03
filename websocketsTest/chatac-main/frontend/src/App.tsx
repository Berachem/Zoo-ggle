import React from 'react';
import './App.css';
import { ChatManager } from './Components';

function substituteHost(s: string): string {
  return s.replace('myhost', document.location.host).replace('myprotocol', document.location.protocol === 'http:' ? 'ws:' : 'wss:');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Demo Chatac frontend</div>
      </header>
      <main>
        <ChatManager socketUrl={substituteHost(process.env.REACT_APP_BACKEND_URL || 'ws://localhost:8090/chat')} />
      </main>
    </div>
  );
}

export default App;
