const router = require('express').Router()
const knex = require('knex')

const dbConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useDefaultAsNull: true,
  // debug: true
}

const db = knex(dbConfig)

// ==== GET ==== //
router.get('/', async (req, res) => {
  try {
    let data = await db('zoos')
    res.send(data)
  }
  catch {
    res.status(500).send(err.message)
  }
})


// ==== POST ==== //


// ==== PUT ==== //


// ==== DELETE ==== //


module.exports = router