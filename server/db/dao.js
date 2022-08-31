'use strict'
const dayjs = require('dayjs')
const crypto = require('crypto')

/**
 * @param {object} db - The db connection.
 * @return {object} - The dao.
 */
function dao(db) {
  const FORMAT = 'YYYY-MM-DD HH:mm:ss'
  const dbRecordsToRounds = (rows) => {
    return rows.map((row) => {
      return {
        letter: row.title,
        category: row.category,
        playedAt: dayjs(row.played_at, FORMAT),
        words: JSON.parse(row.words),
        userId: row.user_id,
      }
    })
  }

  const roundToDbRecord = (round) => {
    return {
      letter: round.letter,
      category: round.category,
      level: round.level,
      played_at: round.playedAt.format(FORMAT),
      words: JSON.stringify(round.words),
      user_id: round.userId,
      score: round.score,
    }
  }

  const listLastRoundsByLetterAndCategory = (letter, category, rounds) => {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT *
                          FROM rounds 
                          WHERE letter=? AND category=? 
                          ORDER BY played_at DESC LIMIT ?`
      db.all(sql, [letter, category, rounds], (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        const rounds = dbRecordsToRounds(rows)
        resolve(rounds)
      })
    })
  }
  const findValidWords = (letter, category) => {
    return new Promise((resolve, reject) => {
      const sql = ` SELECT *
                          FROM words 
                          WHERE letter=? AND category=?`
      db.all(sql, [letter, category], (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        const words = rows.map((row) => row.word)
        resolve(words)
      })
    })
  }
  const getUser = (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?'
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err)
        } else if (row === undefined) {
          resolve(false)
        } else {
          const user = { id: row.id, username: row.email, name: row.name }

          crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
            if (err) reject(err)
            if (
              !crypto.timingSafeEqual(
                Buffer.from(row.hash, 'hex'),
                hashedPassword
              )
            )
              resolve(false)
            else resolve(user)
          })
        }
      })
    })
  }

  const addRound = (round) => {
    const record = roundToDbRecord({ playedAt: dayjs(), ...round })
    return new Promise((resolve, reject) => {
      const sql = `
            INSERT INTO rounds(letter, category, level, played_at, words, score, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?);`

      db.run(
        sql,
        [
          record.letter,
          record.category,
          record.level,
          record.played_at,
          record.words,
          record.score,
          record.user_id,
        ],
        (err) => {
          if (err) {
            reject(err)
          }
          resolve(true)
        }
      )
    })
  }
  return {
    addRound: addRound,
    listLastRoundsByLetterAndCategory: listLastRoundsByLetterAndCategory,
    findValidWords: findValidWords,
    getUser: getUser,
  }
}

module.exports = { dao }
