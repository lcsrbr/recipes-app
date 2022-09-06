import React from 'react';
import loading from '../images/loading.gif';

function Loading() {
  return (
    <div
      className="
        flex
        w-screen
        h-screen
        justify-center
        items-center
    "
    >
      <img
        src={ loading }
        alt="loading"
        className="
        w-12
        "
      />
    </div>
  );
}

export default Loading;
