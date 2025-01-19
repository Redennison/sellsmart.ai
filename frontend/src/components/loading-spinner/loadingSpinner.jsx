import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ClipLoader color="#66BB6A" loading={true} size={50} />
    </div>
  );
}

export default LoadingSpinner;
