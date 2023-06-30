import { useState } from 'react'

const notes = [
  { major: 'C', minor: 'A' },
  { major: 'G', minor: 'E' },
  { major: 'D', minor: 'B' },
  { major: 'A', minor: 'F#' },
  { major: 'E', minor: 'C#' },
  { major: 'B', minor: 'G#' },
  { major: 'Gb', minor: 'Eb' },
  { major: 'Db', minor: 'Bb' },
  { major: 'Ab', minor: 'F' },
  { major: 'Eb', minor: 'C' },
  { major: 'Bb', minor: 'G' },
  { major: 'F', minor: 'D' },
]

interface CircleSegmentProps {
  startAngle: number
  endAngle: number
  radius: number
  onClick: () => void
  fill: string
}

interface CircleTextProps {
  angle: number
  radius: number
  text: string
  fontSize: string
  fontColor: string
}

function CircleSegment({ startAngle, endAngle, radius, onClick, fill }: CircleSegmentProps) {
  const x1 = radius * Math.cos(startAngle)
  const y1 = radius * Math.sin(startAngle)
  const x2 = radius * Math.cos(endAngle)
  const y2 = radius * Math.sin(endAngle)

  return (
    <path
      d={`M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} z`}
      fill={fill}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  )
}

function CircleText({ angle, radius, text, fontSize, fontColor }: CircleTextProps) {
  const x = radius * Math.cos(angle)
  const y = radius * Math.sin(angle)

  return (
    <text x={x} y={y} fill={fontColor} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize}>
      {text}
    </text>
  )
}

function CircleOfFifths() {
  const [selected, setSelected] = useState(0)
  const sliceAngle = (2 * Math.PI) / notes.length
  const radius = 100
  const fontSize = { major: '19px', minor: '13px' }
  const textRadius = { major: 0.8, minor: 0.55 }
  const fontColor = 'white'
  const defaultColor = '#7db0de'
  const selectedColor = '#ecb467'

  const handleSegmentClick = (index: number) => {
    setSelected(index)
  }

  const viewBoxSize = radius * 2
  const svgSize = viewBoxSize * 1.1

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`-${viewBoxSize / 2} -${viewBoxSize / 2} ${viewBoxSize} ${viewBoxSize}`}
      className="cursor-pointer"
    >
      {notes.map((note, index) => {
        const startAngle = index * sliceAngle - Math.PI / 2 - sliceAngle / 2
        const endAngle = startAngle + sliceAngle

        return (
          <g key={note.major} onClick={() => handleSegmentClick(index)}>
            <CircleSegment
              startAngle={startAngle}
              endAngle={endAngle}
              radius={radius}
              onClick={() => handleSegmentClick(index)}
              fill={selected === index ? selectedColor : defaultColor}
            />
            <CircleText
              angle={startAngle + sliceAngle / 2}
              radius={radius * textRadius.major}
              text={note.major}
              fontSize={fontSize.major}
              fontColor={fontColor}
            />
            <CircleText
              angle={startAngle + sliceAngle / 2}
              radius={radius * textRadius.minor}
              text={`${note.minor}m`}
              fontSize={fontSize.minor}
              fontColor={fontColor}
            />
          </g>
        )
      })}
    </svg>
  )
}

function Pad() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-5 mx-6">Pad</div>
      <CircleOfFifths />
    </div>
  )
}

export default Pad
