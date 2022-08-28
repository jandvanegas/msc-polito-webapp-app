'use strict';

const express = require('express');
const sqlite = require("sqlite3");
const morgan = require('morgan')
const bp = require('body-parser');
const scoreService = require('./services/scoreService');
const {check, validationResult} = require('express-validator');
const {dao} = require('./db/dao')
const cors = require('cors');

const app = new express();
app.use(morgan('dev'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
const PORT = 3001;
const db = new sqlite.Database('db/categories.db', (err) => {
    if (err) throw err;
});
const myDao = dao(db);
const myScoreService = scoreService(myDao);

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}

app.use(cors(corsOptions));
app.post('/api/score', 
  [
    check('letter').isIn('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")),
    check('category').isIn(['colors', 'animals', 'countries']),
    check('level').isInt({min: 1, max: 4}),
    check('words').isArray()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`Validation errors: ${JSON.stringify(errors.array())}`);
      return res.status(422).json({ errors: errors.array() });
    }
    myScoreService
      .evaluate(req.body.letter, req.body.category, req.body.level, req.body.words)
      .then((result) => {
        res.status(200).json(result);
       })
      .catch((err) => next(err));
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
