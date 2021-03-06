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

// Load middleware
const idBodyCheck = [requiredData, validateZoosId]

// ==== GET ==== //
router.get('/', async (req, res) => {
  try {
    let data = await db('zoos')
    res.send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:id', validateZoosId, (req, res) => {
  res.send(req.data)
})

// ==== POST ==== //
router.post('/', requiredData, async (req, res) => {
  try {
    let data = await db('zoos').insert(req.body, 'id')
    res.status(201).send(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== PUT ==== //
router.put('/:id', idBodyCheck, async (req, res) => {
  try {
    let count = await db('zoos')
      .where({ id: req.data.id })
      .update(req.body)
    if (count > 0) {
      let data = await db('zoos').where({ id: req.data.id }).first()
      res.send(data)
    } else throw err
  }
  catch(err) {
    res.status(500).send(err.message)
  }
})

// ==== DELETE ==== //
router.delete('/:id', validateZoosId, async (req, res) => {
  try {
    let count = await db('zoos')
      .where({ id: req.data.id })
      .del()
    if (count) {
      res.json({ message: `${count} ${count > 1 ? 'records' : 'record'} deleted` })
    } else throw err
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// Custom Middleware
async function validateZoosId (req, res, next) {
  try {
    let data = await db('zoos')
      .where({ id: req.params.id })
      .first()
    if (data) {
      req.data = data
      next()
    } else {
      res.status(404).json({message: `${req.params.id} does not exist`})
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
}

function requiredData (req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing data" })
  } else if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field." })
  } else {
    next()
  }
}

module.exports = router