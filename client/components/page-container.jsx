import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="">
      <div className="container-sign-in" >
        {children}
      </div>
    </div>
  );
}
