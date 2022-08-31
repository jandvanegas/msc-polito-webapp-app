'use strict'
const configData = require('../config')

/**
 * @param {object} dao - The dao to access the database.
 * @return {object} - The score service.
 */
function scoreService(dao) {
  const evaluate = async (letter, category, level, words) => {
    const validWordsByCategory = await dao.findValidWords(letter, category)
    const validWords = words.filter((word) =>
      validWordsByCategory.includes(word)
    )
    const passed = validWords.length >= configData.MIN_WORDS_PER_LEVEL[level]
    console.log(validWords)
    if (passed) {
      const rounds = await dao.listLastRoundsByLetterAndCategory(
        letter,
        category,
        configData.NUMBER_OF_ROUNDS_TO_CHECK
      )
      const lastUsedWords = rounds.map((round) => round.words).flat()
      const fullPointWords = validWords.filter((word) => {
        return !lastUsedWords.includes(word) && word[0].toUpperCase() === letter
      })
      const fullPoints =
        fullPointWords.length * configData.FULL_POINTS_PER_WORD * level

      const halfPointWords = validWords.filter((word) => {
        return lastUsedWords.includes(word) && word[0].toUpperCase() === letter
      })
      const halfPoints =
        halfPointWords.length * configData.HALF_POINTS_PER_WORD * level

      const score = fullPoints + halfPoints
      return {
        score: score,
        full_point_words: fullPointWords,
        half_point_words: halfPointWords,
        passed: passed,
      }
    }
    return {
      score: 0,
      full_point_words: [],
      half_point_words: [],
      passed: passed,
    }
  }

  return {
    evaluate: evaluate,
  }
}

module.exports = scoreService
