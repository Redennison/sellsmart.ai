import React, { useState } from 'react';
import { Range } from 'react-range';

const DoubleSlider = ({ min = 0, max = 100, step = 1, onChange }) => {
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
                background: `linear-gradient(to right, #ddd ${((values[0] - min) / (max - min)) * 100}%, #6AA84F ${((values[0] - min) / (max - min)) * 100}%, #6AA84F ${((values[1] - min) / (max - min)) * 100}%, #ddd ${((values[1] - min) / (max - min)) * 100}%)`,
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
      <div className="mt-2 text-center">
        {`$${values[0]} to $${values[1]}`}
      </div>
    </div>
  );
};

export default DoubleSlider;
