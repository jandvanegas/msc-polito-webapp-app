import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'

function GameInstructions(props) {
  const { settings, randomLetter } = props
  const [showInstructions, setShowInstructions] = useState(true)
  if (showInstructions) {
    return (
      <>
        <Alert
          className='alert-container'
          variant='success'
          dismissible
          onClose={() => setShowInstructions(false)}
        >
          <span>You are playing in </span>
          <span className='important'>{settings.difficulty} </span>
          <span>mode.</span>
          <br />
          <span> Insert as many </span>
          <span className='important'>{settings.category}</span>
          <br />
          <span> starting with the letter </span>
          <span className='important'>{randomLetter}</span>
        </Alert>
      </>
    )
  } else {
    return <></>
  }
}

export default GameInstructions
