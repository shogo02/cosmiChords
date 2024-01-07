import { useEffect } from 'react';
import VolumeSlider from './parts/VolumeSlider'
import gameSettings from '../models/GameSettings';
import InitialSettings from '../constants/initialSettings';
import Constants from '../constants/constants';

function Mixer() {
  const { masterVolume, setMasterVolume } = gameSettings();

  const handleVolumeChange = (newValue: number) => {
    setMasterVolume(newValue)
  }

  useEffect(() => {
    setMasterVolume(InitialSettings.VOLUME.MASTER);
  }, [setMasterVolume])

  return (
    <div className="p-3 flex flex-col justify-center">
      Mixer
      <VolumeSlider
        volume={masterVolume}
        onChange={handleVolumeChange}
        max={Constants.MASTER_VOLUME.max}
        min={Constants.MASTER_VOLUME.min}
      />
    </div>
  )
}

export default Mixer
