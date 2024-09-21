import React from 'react';

const Error = ({ error }) => {
  return (
    <div>
      <p className="error_txt">{error}</p>
    </div>
  );
};

export default Error;
