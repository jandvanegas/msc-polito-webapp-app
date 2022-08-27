'use strict';
const dayjs = require('dayjs')

function dao(db) {
    const FORMAT = 'YYYY-MM-DD HH:mm:ss'
    const dbRecordsToRounds = (rows) => {
        return rows.map(row => {
            return ({
                letter: row.title,
                category: row.category,
                playedAt: dayjs(row.played_at, FORMAT),
                words: JSON.parse(row.words),
            });
        });
    }

    const roundsToDbRecords = (rounds) => {
      return rounds.map(round => {
        return ({
          title: round.letter,
          category: round.category,
          played_at: round.playedAt.format(FORMAT),
          words: JSON.stringify(round.words),
        });
      })
    }

    const listLastRoundsByLetterAndCategory = (letter, category, rounds) => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT *
                          FROM rounds 
                          WHERE letter=? AND category=? 
                          ORDER BY played_at DESC LIMIT ?`;
            db.all(sql, [letter, category, rounds], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const rounds = dbRecordsToRounds(rows);
                resolve(rounds);
            });
        });
    }
    const findValidWords = (letter, category) => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT *
                          FROM words 
                          WHERE letter=? AND category=?`;
            db.all(sql, [letter, category], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const words = rows.map(row => row.word);
                resolve(words);
            });
        });
    }
    return {
      listLastRoundsByLetterAndCategory: listLastRoundsByLetterAndCategory,
      findValidWords: findValidWords,
    }
}

module.exports = {dao};
