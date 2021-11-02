import React from 'react';

export default function MainPageContainer({ children }) {
  return (
    <div>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
