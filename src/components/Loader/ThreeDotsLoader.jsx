import React from 'react'

const ThreeDotsLoader = ({background = "#ddd"}) => {
    return (
        <div class="flex items-center justify-center space-x-2 animate-bounce">
            <div style={{background:background}} class="w-4 h-4 rounded-full animate-pulse"></div>
            <div style={{background:background}} class="w-4 h-4 rounded-full animate-pulse"></div>
            <div style={{background:background}} class="w-4 h-4 rounded-full animate-pulse"></div>
        </div>
    )
}

export default ThreeDotsLoader
