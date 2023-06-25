import React from 'react'

const Pad = React.memo(() => {
  console.log('pad rendering')

  return <div className="mt-5 mx-6">Pad</div>
})

export default Pad
