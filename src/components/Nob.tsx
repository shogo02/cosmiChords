import React from 'react'

const Nob = React.memo(() => {
  console.log('nob rendering')

  return <div>Nob</div>
})

export default Nob
