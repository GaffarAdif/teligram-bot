import React, { useState, useEffect, useRef } from 'react';

const TapSwapGame = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [number, setNumber] = useState(null);
  const [limitNumber, setLimitNumber] = useState(5000);
  const increaseTimeoutRef = useRef(null);
  const animationIntervalRef = useRef(null);
  const circleRadius = 140; // Half of the circle's diameter (280px)

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // Get x position relative to the box
    const y = event.clientY - rect.top; // Get y position relative to the box

    // Check if the click is within the circle
    const centerX = circleRadius; // Center x of the circle
    const centerY = circleRadius; // Center y of the circle

    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    if (distance <= circleRadius) {
      setPosition({ x, y });
      const giverNumber = 1;

      // Decrease the limit number
      setLimitNumber((prev) => Math.max(prev - giverNumber, 0));
      setNumber(giverNumber); // Show the number clicked

      // Clear any existing timers
      clearTimeout(increaseTimeoutRef.current);
      clearInterval(animationIntervalRef.current);

      // Start a zig-zag animation
      let direction = 1; // 1 for upward, -1 for downward
      let animateCount = 0;
      animationIntervalRef.current = setInterval(() => {
        setPosition((prev) => ({
          ...prev,
          y: prev.y - 10 * direction, // Move up or down by 10 pixels
        }));

        if (animateCount >= 5) {
          clearInterval(animationIntervalRef.current); // Stop after 5 movements
          setTimeout(() => {
            setNumber(null); // Hide number after animation
          }, 500); // Keep number displayed for a bit before hiding
        }

        direction *= -1; // Change direction
        animateCount++;
      }, 250); // Change position every 250ms
    }
  };

  // Function to increase the limit number after a delay
  const increaseLimitNumber = () => {
    // Log to check if function is called
    console.log('Increasing limit number to 5000');
    if (limitNumber < 5000) {
      setLimitNumber(5000); // Increase limit number to 5000
    }
  };



  // Cleanup timers on component unmount or when dependencies change
  useEffect(() => {
    return () => {
      clearTimeout(increaseTimeoutRef.current); // Cleanup timeout on unmount
      clearInterval(animationIntervalRef.current); // Cleanup animation interval on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-fit bg-black py-3">
      <div 
        className="relative w-[320px] h-[320px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-800 cursor-pointer" 
        onClick={handleClick}
     
        onMouseDown={() => { 
          // Clear timeout if the user clicks again while holding down
          clearTimeout(increaseTimeoutRef.current); 
        }} 
      >
        {/* Circle */}
        <div className="w-[280px] h-[280px] bg-blue-500 rounded-full flex items-center justify-center">
          {/* Display the number at the clicked position with animation */}
          {number && (
            <span 
              className="absolute text-white text-3xl transition-all duration-500" 
              style={{ 
                left: position.x, 
                top: position.y, // Keep it at the current position
              }}
            >
              {number}
            </span>
          )}
        </div>
      </div>
      {/* Progress bar and limit number */}
      <div className="flex flex-col items-center mt-2">
        <span className="text-white text-xl mb-1">{limitNumber}/5000</span>
        <div className="w-[340px] h-4 bg-gray-700 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(5000 - limitNumber) / 5000 * 100}%` }} // Calculate the width based on the limit
          />
        </div>
      </div>
    </div>
  );
};

export default TapSwapGame;
