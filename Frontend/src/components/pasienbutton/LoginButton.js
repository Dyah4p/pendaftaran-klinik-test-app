import React from 'react';

const LoginButton = ({ handleLogin }) => {
  return (
    <button onClick={handleLogin} className="login-button">
      Login
    </button>
  );
};

export default LoginButton;
