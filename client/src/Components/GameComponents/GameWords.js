import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function GameWords(props) {
  const { settings, randomLetter, words, setWords } = props
  const placeholderText = `${randomLetter}...`
  const [word, setWord] = useState('')
  const [validWord, setValidWord] = useState(true)

  const handleWordSubmit = (event) => {
    event.preventDefault()
    if (validWord) {
      setWords((oldWords) => [...oldWords, word])
      setWord('')
    } else {
        event.stopPropagation()
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (validWord) {
        setWords((oldWords) => [...oldWords, word])
        setWord('')
      } else {
        event.stopPropagation()
      }
    }
  }
  const showableWords = words.map((word, index) => {
    return (
      <div key={index}>
        <span key={words}>{word}</span>
      </div>
    )
  })
  const handleWordChange = (event) => {
    const newWord = event.target.value.toUpperCase()
    setWord(newWord)
    if (newWord.startsWith(randomLetter)) {
      setValidWord(true)
    } else {
      setValidWord(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleWordSubmit}>
        <Form.Group className='mb-3' controlId='word'>
          <Form.Label>Insert {settings.category}</Form.Label>
          <Form.Control
            type='text'
            placeholder={placeholderText}
            onKeyDown={handleKeyPress}
            onChange={handleWordChange}
            isInvalid={!validWord}
            isValid={word.length > 0 && validWord}
            value={word}
          />
          <Form.Control.Feedback type='invalid'>
            Please Insert a word that starts with {randomLetter}.
          </Form.Control.Feedback>
          <Form.Text className='text-muted'>
            Hit Enter or click insert to add a word
          </Form.Text>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Add
        </Button>
        <Form.Group className='mb-3' controlId='words'>
          <Form.Label>Inserted {settings.category}</Form.Label>
          <Form.Text>{showableWords}</Form.Text>
        </Form.Group>
      </Form>
    </>
  )
}

export default GameWords
