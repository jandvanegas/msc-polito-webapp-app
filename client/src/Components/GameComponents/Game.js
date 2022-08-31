import SelectionPage from './SelectionPage'
import GamePage from './GamePage'
import GameScore from './GameScore'
import { useState } from 'react'

function Game(props) {
  const { loggedIn } = props
  const [settings, setSettings] = useState({ level: 0, category: 0 })
  const [lastWords, setLastWords] = useState([])
  const [letter, setLetter] = useState('')

  if (letter) {
    return (
      <GameScore
        lastWords={lastWords}
        letter={letter}
        settings={settings}
        setLetter={setLetter}
        setSettings={setSettings}
        loggedIn={loggedIn}
      />
    )
  } else if (settings.level && settings.category) {
    return (
      <GamePage
        settings={settings}
        setLetter={setLetter}
        setLastWords={setLastWords}
      />
    )
  } else {
    return <SelectionPage setSettings={setSettings} />
  }
}

export default Game
