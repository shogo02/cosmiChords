import { useState } from 'react'
import VolumeSlider from './parts/VolumeSlider'

function Mixer() {
  const [volume, setVolume] = useState(50)

  const handleVolumeChange = (newValue: number) => {
    setVolume(newValue)
  }

  return (
    <div className="p-3 flex flex-col justify-center">
      Mixer
      <VolumeSlider value={volume} onChange={handleVolumeChange} />
    </div>
  )
}

export default Mixer
