import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function GameWords(props) {
  const { settings, randomLetter } = props
  const placeholderText = `${randomLetter}...`
  const [words, setWords] = useState([])
  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words))
  }, [words])

  const handleWordSubmit = (event) => {
    event.preventDefault()
    const word = event.target.elements.word.value.toUpperCase()
    event.target.elements.word.value = ''
    setWords((oldWords) => [...oldWords, word])
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const word = event.target.value.toUpperCase()
      event.target.value = ''
      setWords((oldWords) => [...oldWords, word])
    }
  }
  const showableWords = words.map((word) => {
    return (
      <div>
        <span>{word}</span>
      </div>
    )
  })

  return (
    <>
      <Form onSubmit={handleWordSubmit}>
        <Form.Group className='mb-3' controlId='word'>
          <Form.Label>Insert {settings.category}</Form.Label>
          <Form.Control
            type='text'
            placeholder={placeholderText}
            onKeyDown={handleKeyPress}
          />
          <Form.Text className='text-muted'>
            Hit Enter or click insert to a word
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
