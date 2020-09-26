import React from 'react'

export default function Slider({min,max,value,handleChange}) {
    return (
        <div className="slider-container">
        <div className="slider-div">
            <input 
            type="range" 
            className="slider"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            />
        </div>
        </div>
    )
}
