import React, { useState } from 'react';

interface LogMessage {
  id: number;
  message: string;
}

const LoggingComponent: React.FC = () => {
  const [messages, setMessages] = useState<LogMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleLogMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage: LogMessage = {
        id: Date.now(),
        message: inputValue.trim()
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputValue('');
    }
  };

  // Check if user is authenticated before allowing logging
  const isAuthenticated = true; // Replace with actual authentication status

  return (
    <div className="container mt-4">
      <h2>Logging Component</h2>
      {!isAuthenticated && (
        <p className="text-danger">You need to login or register to log messages.</p>
      )}
      {isAuthenticated && (
        <>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter log message"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogMessage}>
            Log Message
          </button>
        </>
      )}
      <div className="mt-4">
        {messages.map(log => (
          <div key={log.id} className="alert alert-info" role="alert">
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoggingComponent;
