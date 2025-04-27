import React from 'react';
import { Spin } from 'antd';

function Loading() {
  return (
    <Spin
      size="large"
      tip="Loading..."
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    />
  );
}

export default Loading;