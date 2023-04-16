import React from "react";
import '../../css/MouseScrollIndicator.css'

type MouseScrollIndicatorProps = {
  id: string;
};

const MouseScrollIndicator: React.FC<MouseScrollIndicatorProps> = ({ id }) => {
  const handleClick = () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mouseScrollIndicator" onClick={handleClick}>
        <div className="mouseScrollIndicator__scroll">
        </div>
    </div>

  );
};

export default MouseScrollIndicator;
