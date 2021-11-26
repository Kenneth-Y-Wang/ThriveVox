import React from 'react';

export default function Spinner(props) {
  return (
    <div className="col-full spinner-holder">
      <div className={props.loading ? 'lds-grid ' : 'lds-grid  hidden '}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
