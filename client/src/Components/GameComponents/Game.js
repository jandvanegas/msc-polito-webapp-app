import SelectionPage from './SelectionPage'
import GamePage from './GamePage'
import GameScore from './GameScore'
import { useState, useEffect } from 'react'
import Api from '../../Api'

function Game(props) {
  const { loggedIn } = props
  const [settings, setSettings] = useState({ level: 0, category: 0 })
  const [lastWords, setLastWords] = useState([])
  const [letter, setLetter] = useState('')
  const [score, setScore] = useState('')

  useEffect(() => {
    const checkScore = async () => {
      if (letter && !score) {
        const uniqueWords = [...new Set(lastWords)]
        const response = await Api.postScore(
          settings.category,
          letter,
          settings.level,
          uniqueWords
        )
        setScore({
          score: response.score,
          passed: response.passed,
        })
      }
    }
    checkScore()
  }, [score, settings, letter, lastWords])

  useEffect(() => {
    const recordRound = async () => {
      if (letter && loggedIn && score && score.passed) {
        const uniqueWords = [...new Set(lastWords)]
        await Api.addRound({
          category: settings.category,
          letter: letter,
          level: settings.level,
          words: uniqueWords,
          score: score.score,
        })
      }
    }
    recordRound()
  }, [score, lastWords, settings, letter, loggedIn])

  if (letter) {
    return (
      <GameScore
        lastWords={lastWords}
        letter={letter}
        settings={settings}
        setLetter={setLetter}
        setSettings={setSettings}
        loggedIn={loggedIn}
        score={score}
      />
    )
  } else if (settings.level && settings.category) {
    return (
      <GamePage
        settings={settings}
        setLetter={setLetter}
        setLastWords={setLastWords}
        setScore={setScore}
      />
    )
  } else {
    return <SelectionPage setSettings={setSettings} />
  }
}

export default Game
