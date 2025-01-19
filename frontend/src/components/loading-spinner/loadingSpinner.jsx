import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader color="purple" loading={true} size={50} />
    </div>
  );
}

export default LoadingSpinner;
