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
        letter: row.letter,
        category: row.category,
        playedAt: dayjs(row.played_at, FORMAT),
        words: JSON.parse(row.words),
        userId: row.user_id,
        level: row.level,
        score: row.score,
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
  const getRounds = (userId) => {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT letter, category, level, played_at, words, score
            FROM rounds WHERE user_id = ? ORDER BY played_at DESC limit 10;`
      db.all(sql, [userId], (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve(dbRecordsToRounds(rows))
      })
    })
  }
  const getLeaders = () => {
    return new Promise((resolve, reject) => {
      const sql = `with total_ranking as (SELECT sum(score) as score,
                              category,
                              name,
                              rank() OVER (
                                  PARTITION BY category ORDER BY sum(score) DESC
                                  ) as rank
                       FROM rounds
                                LEFT JOIN users u ON u.id = rounds.user_id
                       group by category, user_id)
                    SELECT name, category, score
                    FROM total_ranking where rank=1 and score>0;`
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows)
      })
    })
  }
  return {
    addRound: addRound,
    getRounds: getRounds,
    listLastRoundsByLetterAndCategory: listLastRoundsByLetterAndCategory,
    findValidWords: findValidWords,
    getUser: getUser,
    getLeaders: getLeaders,
  }
}

module.exports = { dao }
