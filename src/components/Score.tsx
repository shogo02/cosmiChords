import { Note } from 'webmidi'
import abcjs from 'abcjs'


function Score() {

  abcjs.renderAbc(
    'abcjs',
    `K:C
    [CEG]8|`,
    {
      paddingtop: 10,
      paddingbottom: 10,
      paddingleft: 80,
      paddingright: 80,
      staffwidth: 147,
      // wrap: { minSpacing: 0, maxSpacing: 0, preferredMeasuresPerLine: 4 },
      // viewportHorizontal: true,
      // viewportVertical: true,
      // responsive: 'resize',
    }
  )

  return <div id="abcjs" className="" />
}

export default Score