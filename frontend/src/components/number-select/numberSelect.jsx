import React from 'react'
import Select from 'react-select'
import { formatNumber } from '../../lib/utils'

const NumberSelect = ({ min, max, step, onChange }) => {
  // Create options array: { value: number, label: string }
  const options = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => {
      const value = min + i * step
      return { value, label: `${formatNumber(value)}` }
    }
  )

  // Minimal custom styles for black text & a bounded menu.
  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: '#000',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000',
    }),
    option: (provided) => ({
      ...provided,
      color: '#000',
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflowY: 'auto',
    }),
  }

  return (
    <Select
      options={options}
      defaultValue={options[options.length - 1]}
      onChange={(selected) => {
        if (onChange) {
          onChange(selected.value)
        }
      }}
      styles={customStyles}
      menuPortalTarget={document.body}
      menuPosition="fixed"
    />
  )
}

export default NumberSelect
