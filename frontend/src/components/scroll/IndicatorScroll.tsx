
import React, { useEffect, useState } from 'react';


export default function IndicatorScroll() {

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
      function handleScroll() {
        setScrollY(window.scrollY);
      }
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    
    return (
        <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: `${
              (scrollY / (document.body.scrollHeight - window.innerHeight)) *
              100
            }%`,
            height: "7px",
            backgroundColor: "#00b894",
          }}
        />
      </div>
    );
}



