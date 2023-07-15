/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'

interface VolumeSliderProps {
  value: number
  onChange: (newValue: number) => void
}

function VolumeSlider({ value, onChange }: VolumeSliderProps) {
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = () => {
    setDragging(true)
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      const sliderWidth = event.currentTarget.parentElement?.clientWidth ?? 0
      const positionX = event.nativeEvent.offsetX
      const newValue = Math.round((positionX / sliderWidth) * 100)
      onChange(newValue)
    }
  }

  const sliderStyle = {
    backgroundColor: '#e0e0e0',
    boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
  }

  const barStyle = {
    backgroundColor: '#d1d9e6',
    width: `${value}%`,
  }

  const knobStyle = {
    backgroundColor: '#e0e0e0',
    boxShadow: '3px 3px 8px #bebebe, -3px -3px 8px #ffffff',
  }

  return (
    <div className="h-4 w-48 rounded-full relative cursor-pointer" style={sliderStyle}>
      <div className="h-full rounded-full absolute top-0 left-0" style={barStyle} />
      <div
        className="h-4 w-4 rounded-full absolute top-0 left-0 transform -translate-x-2/4 -translate-y-1/2"
        style={knobStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  )
}

export default VolumeSlider
