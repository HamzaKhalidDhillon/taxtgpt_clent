// App.js
import React from 'react';
import Chat from './Chat.js';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  debugger;
  return (
    <div className="App">
      {isLoggedIn ? <Chat /> : <Login setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
