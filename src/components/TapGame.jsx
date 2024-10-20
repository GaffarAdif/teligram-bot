import React, { useState, useEffect, useRef, useContext } from 'react';
import MyContext from '../Contex/MyContext';

const circleImage = 'https://res.cloudinary.com/dijeptfb6/image/upload/v1728886415/aio94dgr9n1as27whbhg.png';

const TapSwapGame = () => {
  const { setAppUser } = useContext(MyContext);

  // Reset the limit number in localStorage upon page refresh

  // Retrieve the initial value of limitNumber from localStorage
  const getInitialLimitNumber = () => {
    const savedLimitNumber = localStorage.getItem('limitNumber');
    return savedLimitNumber ? Number(savedLimitNumber) : 5000;
  };

  const [limitNumber, setLimitNumber] = useState(getInitialLimitNumber); // Initialize limitNumber
  const [clicks, setClicks] = useState([]);
  const [isPunched, setIsPunched] = useState(false); // State to track punch animation
  const circleRadius = 140; // Half of the circle's diameter (280px)

  const animationRefs = useRef({}); // Store multiple animation intervals by unique keys

  // Save limitNumber to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('limitNumber', limitNumber);
  }, [limitNumber]);

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // Get x position relative to the box
    const y = event.clientY - rect.top; // Get y position relative to the box

    // Trigger punch animation
    setIsPunched(true);
    setTimeout(() => setIsPunched(false), 150); // Reset after 150ms

    // Check if the click is within the circle
    const distance = Math.sqrt((x - circleRadius) ** 2 + (y - circleRadius) ** 2);
    if (distance <= circleRadius) {
      const giverNumber = 1;

      // Decrease the limit number
      setLimitNumber((prev) => Math.max(prev - giverNumber, 0));
      const StoredData = JSON.parse(localStorage.getItem('user'));
      StoredData.Balance += giverNumber;

      // Update appUser.Balance
      setAppUser((prev) => (StoredData));

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
    }
  };

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      Object.values(animationRefs.current).forEach(clearInterval); // Clear all animations
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-fit bg-gradient-to-b from-gray-800 via-black to-gray-900 py-8 overflow-hidden rounded-t-[15%]"
      onClick={handleClick}
      style={{ width: '100%', overflowX: 'hidden' }}  // Hide horizontal scroll
      tabIndex={0} // Allow keyboard focus
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
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
