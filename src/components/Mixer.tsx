import React from 'react'

const Mixer = React.memo(() => {
  console.log('mixer rendering')

  return <div className="p-3 flex flex-col justify-center">Mixer</div>
})

export default Mixer
