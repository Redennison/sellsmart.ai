'use client';

import React, { useState } from 'react';
import { Range } from 'react-range';
import { formatNumber } from '@/lib/utils';

const DoubleSlider = ({ min = 0, max = 200000, step = 2500, onChange }) => {
  const [values, setValues] = useState([min, max]);

  return (
    <div className="max-w-[900px] w-full p-4">
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(newValues) => {
          setValues(newValues);
          onChange(newValues);
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
                background: `linear-gradient(to right, #BDBDBD ${((values[0] - min) / (max - min)) * 100}%, #6AA84F ${((values[0] - min) / (max - min)) * 100}%, #6AA84F ${((values[1] - min) / (max - min)) * 100}%, #BDBDBD ${((values[1] - min) / (max - min)) * 100}%)`,
                cursor: 'pointer'
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
        {`${formatNumber(values[0])} km to ${formatNumber(values[1])} km`}
      </div>
    </div>
  );
};

export default DoubleSlider;
