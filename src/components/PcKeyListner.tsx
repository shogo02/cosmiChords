import { useEffect } from 'react'

export type PcKeyListenerProps = {
  keyDownHandler: (event: KeyboardEvent) => void
  keyUpHandler: (event: KeyboardEvent) => void
}

function PcKeyListener(props: PcKeyListenerProps) {
  const { keyDownHandler, keyUpHandler } = props
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler, false)
    return () => {
      document.removeEventListener('keydown', keyDownHandler, false)
    }
  }, [keyDownHandler])

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler, false)
    return () => {
      document.removeEventListener('keyup', keyUpHandler, false)
    }
  }, [keyUpHandler])

  return <div />
}

export default PcKeyListener
