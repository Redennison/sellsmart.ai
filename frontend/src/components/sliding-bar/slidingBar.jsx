'use client';

import React, { useState } from 'react';

const SlidingBar = ({ id, title, min = 5000, max = 200000, step = 5000, unit = null, onValueChange, valid}) => {
  const [value, setValue] = useState(min);

  const handleChange = (e) => {
    const newValue = Number(e.target.value)
    if (!valid(newValue)) {
      return
    }
    setValue(newValue)
    onValueChange(newValue)
    updateSliderBackground(newValue)
  };

  const updateSliderBackground = (value) => {
    const percentage = ((value - min) / (max - min)) * 100;
    const slider = document.getElementById('slider-' + id);
    slider.style.background = `linear-gradient(to right, #6AA84F ${percentage}%, #374151 ${percentage}%)`;
  };

  return (
    <div className="max-w-[900px] flex flex-col items-center w-full p-4">
      <label htmlFor={"slider-" + id} className="mb-4 text-lg font-medium text-gray-400">
        {title}
      </label>
      <input
        id={"slider-" + id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none slider"
        style={{
          background: `linear-gradient(to right, #6AA84F 0%, #374151 0%)`,
        }}
      />
      <div className="flex justify-center w-full mt-2 text-gray-400 text-sm">
        <span>
          {value.toLocaleString()}
          {unit ? " " + unit : ""}
        </span>
      </div>
      <style jsx>{`
        #slider-${id}::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #388E3C; /* Very dark purple */
          border-radius: 50%;
          cursor: pointer;
        }

        #slider-${id}::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #388E3C; /* Very dark purple */
          border-radius: 50%;
          cursor: pointer;
        }

        #slider-${id}::-ms-thumb {
          width: 16px;
          height: 16px;
          background: #388E3C; /* Very dark purple */
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SlidingBar;
