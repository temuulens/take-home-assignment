import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="w-80 bg-gray-800 p-4">
      <h2 className="text-lg font-semibold mb-2">Online Users ({users.length})</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
