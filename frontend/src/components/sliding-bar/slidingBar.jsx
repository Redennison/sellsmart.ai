'use client';

import React, { useState } from 'react';
import { Range } from 'react-range';
import { formatNumber } from '@/lib/utils';

const SlidingBar = ({ min = 0, max = 100, step = 500, onChange }) => {
  const [value, setValue] = useState(min);

  return (
    <div className="max-w-[900px] w-full p-4">
      <Range
        values={[value]}
        step={step}
        min={min}
        max={max}
        onChange={(newValues) => {
          setValue(newValues[0]);
          onChange(newValues[0]);
        }}
        renderTrack={({ props, children }) => {
          const { key, ...rest } = props; // Destructure key and pass it explicitly
          return (
            <div
              key={key}
              {...rest}
              style={{
                ...props.style,
                height: '4px',
                background: `linear-gradient(to right, #6AA84F ${((value - min) / (max - min)) * 100}%, #BDBDBD ${((value - min) / (max - min)) * 100}%)`,
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props; // Destructure key and pass it explicitly
          return (
            <div
              key={key}
              {...rest}
              style={{
                ...props.style,
                height: '16px',
                width: '16px',
                backgroundColor: '#388E3C',
                borderRadius: '50%',
                outline: 'none', // Remove default focus outline
                boxShadow: 'none', // Remove any unwanted shadow
                cursor: 'pointer', // Ensure consistent pointer styling
                transform: 'none', // Prevent any applied transforms
              }}
            />
          );
        }}
      />
      <div className="mt-2 text-center text-gray-400">
        {`${formatNumber(value)} km`}
      </div>
    </div>
  );
};

export default SlidingBar;
