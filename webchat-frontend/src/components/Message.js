import React from 'react';

const Message = ({ message }) => {
  return (
    <div className="mb-4">
      <strong className="text-green-500">{message.user}:</strong> <span>{message.text}</span>
    </div>
  );
};

export default Message;
