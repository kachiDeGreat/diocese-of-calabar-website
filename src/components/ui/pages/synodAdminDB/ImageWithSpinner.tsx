import React, { useState } from "react";

const ImageWithSpinner = ({
  src,
  alt,
  className,
  crossOrigin,
  id,
  onImageLoad,
}: any) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      id={id}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        flexShrink: 0,
      }}
    >
      {isLoading && (
        <div style={{ position: "absolute", zIndex: 1 }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              border: "2px solid #cbd5e1",
              borderTopColor: "#c52810",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        crossOrigin={crossOrigin}
        onLoad={() => {
          setIsLoading(false);
          if (onImageLoad) onImageLoad();
        }}
        onError={() => {
          setIsLoading(false);
          if (onImageLoad) onImageLoad();
        }}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ImageWithSpinner;
