'use strict';

function scoreService(dao) {
  const NUMBER_OF_ROUNDS_TO_CHECK = 3;
  const FULL_POINTS_PER_WORD = 10;
  const HALF_POINTS_PER_WORD = 5;
  const evaluate = async (letter, category, level, words) => {
    const validWordsByCategory = await dao.findValidWords(letter, category)
    console.log(words)
    console.log(validWordsByCategory)
    const validWords = words.filter(
      word => validWordsByCategory.includes(word)
    )

    const rounds = await dao.listLastRoundsByLetterAndCategory(letter, category, NUMBER_OF_ROUNDS_TO_CHECK);
    const lastUsedWords = rounds.map(round => round.words).flat()
    const fullPointWords = validWords.filter(word => {
      return !lastUsedWords.includes(word) && word[0].toUpperCase() === letter
    })
    const fullPoints = fullPointWords.length * FULL_POINTS_PER_WORD * level;

    const halfPointWords = validWords.filter(word => {
      return lastUsedWords.includes(word) && word[0].toUpperCase() === letter
    })
    const halfPoints = halfPointWords.length * HALF_POINTS_PER_WORD * level;

    const score = fullPoints + halfPoints;

    return {score: score, full_point_words: fullPointWords, half_point_words: halfPointWords};
  }

  return {
    evaluate: evaluate
  }
}

module.exports = scoreService;
