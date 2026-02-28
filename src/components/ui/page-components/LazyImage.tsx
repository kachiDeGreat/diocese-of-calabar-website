import React, { useState } from "react";
import { motion } from "framer-motion";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  placeholderColor?: string;
  spinnerBoxColor?: string;
  onLoadChange?: (isLoaded: boolean) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  style,
  wrapperClassName,
  placeholderColor = "#ffffff",
  spinnerBoxColor = "transparent", // Default is transparent so it doesn't break your other pages
  onLoadChange,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoadChange) {
      onLoadChange(true);
    }
  };

  return (
    <div
      className={wrapperClassName}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: placeholderColor,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Small Box for the spinner */}
          <div
            style={{
              backgroundColor: spinnerBoxColor,
              padding: spinnerBoxColor !== "transparent" ? "15px" : "0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                spinnerBoxColor !== "transparent"
                  ? "0 4px 10px rgba(0,0,0,0.3)"
                  : "none",
            }}
          >
            <motion.div
              style={{
                width: "40px",
                height: "40px",
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #c52810",
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleLoad} // Also trigger on error so it doesn't spin forever
          loading="lazy"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          {...props}
        />
      </motion.div>
    </div>
  );
};

export default LazyImage;
