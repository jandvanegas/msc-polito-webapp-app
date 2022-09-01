'use strict'

const bp = require('body-parser')
const config = require('./config')
const cors = require('cors')
const Express = require('express')
const morgan = require('morgan')
const scoreService = require('./services/scoreService')
const sqlite = require('sqlite3')

// Session handling
const LocalStrategy = require('passport-local')
const passport = require('passport')
const session = require('express-session')

const { check, validationResult } = require('express-validator')
const { dao } = require('./db/dao')

const app = new Express()
app.use(morgan('dev'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const db = new sqlite.Database('db/categories.db', (err) => {
  if (err) throw err
})
const myDao = dao(db)
const myScoreService = scoreService(myDao)

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))

// Session management
passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await myDao.getUser(username, password)
    if (!user) return cb(null, false, 'Incorrect username or password.')
    return cb(null, user)
  })
)
passport.serializeUser(function (user, cb) {
  cb(null, user)
})
passport.deserializeUser(function (user, cb) {
  // this user is id + email + name
  return cb(null, user)
})
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ error: 'Not authorized' })
}
app.use(
  session({
    secret: 'super_secret_secret',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.authenticate('session'))
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user)
})
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user, status: 'logged_in' })
  } else {
    res.json({ user: null, status: 'logged_out' })
  }
})
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end()
  })
})

app.post(
  '/api/score',
  [
    check('letter').isIn(config.ALPHABET.split('')),
    check('category').isIn(['colors', 'animals', 'countries']),
    check('level').isInt({ min: 1, max: 4 }),
    check('words').isArray(),
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(`Validation errors: ${JSON.stringify(errors.array())}`)
      return res.status(422).json({ errors: errors.array() })
    }
    myScoreService
      .evaluate(
        req.body.letter,
        req.body.category,
        req.body.level,
        req.body.words
      )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => next(err))
  }
)

app.post(
  '/api/rounds',
  [
    check('letter').isIn(config.ALPHABET.split('')),
    check('category').isIn(['colors', 'animals', 'countries']),
    check('level').isInt({ min: 1, max: 4 }),
    check('words').isArray(),
    check('score').isInt({ min: 0 }),
  ],
  isLoggedIn,
  async (req, res) => {
    const userId = req.user.id
    console.log("Receiving")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
      await myDao.addRound({
        userId: userId,
        letter: req.body.letter,
        category: req.body.category,
        level: req.body.level,
        words: req.body.words,
        score: req.body.score,
      })
    } catch (err) {
      console.log(err)
      if (err.code && err.code === 'SQLITE_ERROR') {
        return res.status(503).end()
      } else {
        return res.status(500).end()
      }
    }
    console.log("Added")
    return res.status(201).end()
  }
)

app.get('/api/rounds', isLoggedIn, async (req, res) => {
  const userId = req.user.id
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    const rounds = await myDao.getRounds(userId)
    return res.status(200).json(rounds)
  } catch (err) {
    console.log(err)
    if (err.code && err.code === 'SQLITE_ERROR') {
      return res.status(503).end()
    } else {
      return res.status(500).end()
    }
  }
})
app.get('/api/leaderboard', async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  try {
    const leaders = await myDao.getLeaders()
    return res.status(200).json(leaders)
  } catch (err) {
    console.log(err)
    if (err.code && err.code === 'SQLITE_ERROR') {
      return res.status(503).end()
    } else {
      return res.status(500).end()
    }
  }
})
app.listen(config.PORT, () =>
  console.log(`Server running on http://localhost:${config.PORT}/`)
)
