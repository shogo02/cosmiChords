interface VolumeSliderProps {
  volume: number
  onChange: (newValue: number) => void,
  max: number,
  min: number,
}

function VolumeSlider({ volume, onChange, max, min }: VolumeSliderProps) {

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={volume}
        onChange={handleSliderChange}
        className="h-4 bg-gray-200 rounded-full cursor-pointer"
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          outline: 'none',
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          return false;
        }}
      />
      <span className="ml-4 text-l">{volume}</span>
    </div>
  );
}

export default VolumeSlider
