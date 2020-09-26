import React from 'react'

export default function SidebarItem({name,active,value,handleClick}) {
    return (
        <button 
        className={`sidebar-item ${active ? 'active':''}`}
        onClick={handleClick}
        >
        {name}
        <span className="slider-value">{value[0]}{value[1]}</span>
        </button>
    )
}
