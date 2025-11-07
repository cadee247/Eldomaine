import React, { useEffect, useState } from 'react';
import splashVideo from '../assets/SplashScreen/ss.mp4';
import '../css/SplashScreen.css';

function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Automatically hide splash after video ends
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish(); // Callback to show main app
    }, 5000); // fallback in case video metadata fails (5s)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    visible && (
      <div className="splash-container">
        <video
          src={splashVideo}
          autoPlay
          muted
          playsInline
          onEnded={() => {
            setVisible(false);
            if (onFinish) onFinish();
          }}
        />
      </div>
    )
  );
}

export default SplashScreen;
