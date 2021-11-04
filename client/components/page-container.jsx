import React from 'react';

export default function PageContainer({ children, containerClass }) {
  return (
    <div className="">
      <div className={containerClass} >
        {children}
      </div>
    </div>
  );
}
