import React from 'react'

const ThreeDotsLoader = ({background = "#ddd"}) => {
    return (
        <div className="flex items-center justify-center space-x-2 animate-bounce">
            <div style={{background:background}} className="w-4 h-4 rounded-full animate-pulse"></div>
            <div style={{background:background}} className="w-4 h-4 rounded-full animate-pulse"></div>
            <div style={{background:background}} className="w-4 h-4 rounded-full animate-pulse"></div>
        </div>
    )
}

export default ThreeDotsLoader
