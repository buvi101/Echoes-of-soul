// SplineViewer.jsx
import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineViewer = () => {
  return (
    <div className="robot-container">
      <div className="robot">
        <Spline scene="https://prod.spline.design/JXGt53S9OgH0JJgD/scene.splinecode" />
      </div>
    </div>
  );
};

export default SplineViewer;
