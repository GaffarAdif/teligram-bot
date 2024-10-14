import React, { useState, useEffect, useRef } from 'react';

const  circleImage = 'https://res.cloudinary.com/dijeptfb6/image/upload/v1728886415/aio94dgr9n1as27whbhg.png'

const TapSwapGame = () => {
  const [limitNumber, setLimitNumber] = useState(5000);
  const [clicks, setClicks] = useState([]);
  const [isPunched, setIsPunched] = useState(false); // State to track punch animation
  const circleRadius = 140; // Half of the circle's diameter (280px)
  
  const increaseTimeoutRef = useRef(null);
  const animationRefs = useRef({}); // Store multiple animation intervals by unique keys
  const gradualIncreaseRef = useRef(null); // Ref for gradual increase interval

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // Get x position relative to the box
    const y = event.clientY - rect.top; // Get y position relative to the box

    // Trigger punch animation
    setIsPunched(true);
    setTimeout(() => setIsPunched(false), 150); // Reset after 150ms

    // Check if the click is within the circle
    const centerX = circleRadius; // Center x of the circle
    const centerY = circleRadius; // Center y of the circle
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    if (distance <= circleRadius) {
      const giverNumber = 20;

      // Decrease the limit number
      setLimitNumber((prev) => Math.max(prev - giverNumber, 0));

      const clickId = Date.now(); // Unique identifier for each click

      // Add the new click to the clicks array
      setClicks((prevClicks) => [
        ...prevClicks,
        { id: clickId, x, y, number: giverNumber }
      ]);

      // Start a zig-zag animation for the new click
      let direction = 1; // 1 for upward, -1 for downward
      let animateCount = 0;

      animationRefs.current[clickId] = setInterval(() => {
        setClicks((prevClicks) =>
          prevClicks.map((click) =>
            click.id === clickId
              ? { ...click, y: click.y - 10 * direction }
              : click
          )
        );

        if (animateCount >= 5) {
          clearInterval(animationRefs.current[clickId]);
          setClicks((prevClicks) => prevClicks.filter((click) => click.id !== clickId));
        }

        direction *= -1; // Change direction
        animateCount++;
      }, 250); // Change position every 250ms

      // Restart the increase timeout every time the user clicks
      clearTimeout(increaseTimeoutRef.current);
      clearInterval(gradualIncreaseRef.current); // Stop previous gradual increase, if any

      increaseTimeoutRef.current = setTimeout(() => {
        gradualIncreaseRef.current = setInterval(() => {
          setLimitNumber((prev) => {
            if (prev < 5000) {
              return Math.min(prev + 10, 5000); // Increase by 10 until reaching 5000
            } else {
              clearInterval(gradualIncreaseRef.current); // Stop when reaching 5000
              return prev;
            }
          });
        }, 100); // Increase every 100ms
      }, 3000); // Start increasing after 3 seconds of no clicking
    }
  };

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      Object.values(animationRefs.current).forEach(clearInterval); // Clear all animations
      clearTimeout(increaseTimeoutRef.current); // Clear timeout
      clearInterval(gradualIncreaseRef.current); // Clear the increase interval
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-fit bg-gradient-to-b from-gray-800 via-black to-gray-900 py-8 overflow-hidden rounded-t-[15%]"
      onClick={handleClick}
      style={{ width: '100%', overflowX: 'hidden' }}  // Hide horizontal scroll
    >
      <div
        className={`relative w-[320px] h-[320px] border border-gray-500 rounded-full flex items-center justify-center bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 shadow-xl cursor-pointer transition-transform ${
          isPunched ? 'scale-90' : 'scale-100' // Punch effect on click
        }`}
        style={{
          boxShadow: `0 0 30px 5px rgba(0, 255, 255, 0.7), 
                      0 0 60px 15px rgba(0, 191, 255, 0.5)`, // Glowing shadow
          animation: 'glow 3s infinite', // Pulsating glow animation
        }}
      >
        {/* Circle */}
        <div className="w-[280px] h-[280px] bg-gradient-to-b from-green-500 via-teal-400 to-cyan-500 rounded-full flex items-center justify-center relative">
          {/* Image in the center of the circle */}
          <img 
            src={circleImage} 
            alt="Circle Center" 
            className="w-[180px] h-[180px] rounded-full" // Adjust width and height as needed
            style={{ position: 'absolute' }} // Position absolutely within the circle
          />
          {/* Display the numbers at the clicked positions with animation */}
          {clicks.map((click) => (
            <span
              key={click.id}
              className="absolute text-white text-3xl font-bold animate-pulse transition-all duration-500"
              style={{
                left: click.x,
                top: click.y, // Keep it at the current position
              }}
            >
              {click.number}
            </span>
          ))}
        </div>
      </div>
      {/* Progress bar and limit number */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-cyan-400 text-2xl font-semibold mb-2">{limitNumber}/5000</span>
        <div className="w-[340px] h-6 bg-gray-700 rounded-full shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${(5000 - limitNumber) / 5000 * 100}%` }} // Calculate the width based on the limit
          />
        </div>
      </div>
    </div>
  );
};

export default TapSwapGame;
