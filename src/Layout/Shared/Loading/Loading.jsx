import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import Animation from '../../../assets/Lotties/ShoppingCartLoader.json';
import Lottie from "lottie-react";

const Loading = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh" // Full screen center
      }}>
        <Lottie
          animationData={Animation}
          loop={true}
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }

  return null; // Optional: return something else when not loading
};

export default Loading;
