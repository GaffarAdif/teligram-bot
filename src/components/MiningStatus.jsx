// src/components/MiningStatus.jsx
import React, { useState, useEffect } from 'react';


function MiningStatus() {
  const [status, setStatus] = useState('Loading...');


  return (
    <div className="bg-gray-100 p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold">Mining Status</h3>

    </div>
  );
}

export default MiningStatus;
