import React, { useState } from 'react';

const NetworkHeader = () => {
  const [selectedTab, setSelectedTab] = useState('grow'); // Default selected tab is 'grow'

  return (
    <div className="flex justify-start gap-10 bg-white py-3 rounded-xl px-4">
      {/* Grow Option */}
      <div
        className="relative cursor-pointer"
        onClick={() => setSelectedTab('grow')}
      >
        <span className="text-lg font-[500] text-gray-600">Grow</span>
        <div
          className={`absolute bottom-[-12px] left-0 w-full h-[2px] ${selectedTab === 'grow' ? 'bg-green-500' : 'bg-transparent'}`}
        ></div>
      </div>

      {/* Catch Up Option */}
      <div
        className="relative cursor-pointer"
        onClick={() => setSelectedTab('catchUp')}
      >
        <span className="text-lg font-[500] text-gray-600">Catch Up</span>
        <div
          className={`absolute bottom-[-12px] left-0 w-full h-[2px] ${selectedTab === 'catchUp' ? 'bg-green-500' : 'bg-transparent'}`}
        ></div>
      </div>
    </div>
  );
};

export default NetworkHeader;

