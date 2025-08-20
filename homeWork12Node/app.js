import express from 'express'
import dotenv from 'dotenv'
import { connectToDb, getDb } from './db/index.js'
import { ObjectId } from 'mongodb'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

function products() {
  return getDb().collection('products')
}

app.post('/products', async (req, res) => {
  try {
    const { name, price, description } = req.body

    if (!name || typeof name !== 'string') {
      return res
        .status(400)
        .json({ error: 'name is required and must be a string' })
    }
    if (!Number.isFinite(price) || price < 0) {
      return res
        .status(400)
        .json({
          error: 'price is required and must be a finite, non-negative number',
        })
    }
    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'description must be a string' })
    }

    const doc = {
      name,
      price,
      description: description ?? '',
      createdAt: new Date(),
    }

    const result = await products().insertOne(doc)
    const created = await products().findOne({ _id: result.insertedId })

    return res
      .status(201)
      .location(`/products/${result.insertedId}`)
      .json(created)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
})

app.get('/products', async (_req, res) => {
  try {
    const list = await products().find().toArray()
    return res.json(list)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id)
    const item = await products().findOne({ _id })
    if (!item) return res.status(404).json({ error: 'Product not found' })
    return res.json(item)
  } catch (err) {
    if (err.name === 'BSONTypeError') {
      return res.status(400).json({ error: 'Invalid id format' })
    }
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
})

app.put('/products/:id', async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id)
    const { name, price, description } = req.body

    const update = {}
    if (name !== undefined) {
      if (typeof name !== 'string')
        return res.status(400).json({ error: 'name must be a string' })
      update.name = name
    }
    if (price !== undefined) {
      if (!Number.isFinite(price) || price < 0) {
        return res
          .status(400)
          .json({ error: 'price must be a finite, non-negative number' })
      }
      update.price = price
    }
    if (description !== undefined) {
      if (typeof description !== 'string')
        return res.status(400).json({ error: 'description must be a string' })
      update.description = description
    }
    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ error: 'Nothing to update. Provide at least one field.' })
    }

    const result = await products().findOneAndUpdate(
      { _id },
      { $set: update, $currentDate: { updatedAt: true } },
      { returnDocument: 'after' }
    )

    if (!result.value)
      return res.status(404).json({ error: 'Product not found' })
    return res.json(result.value)
  } catch (err) {
    if (err.name === 'BSONTypeError') {
      return res.status(400).json({ error: 'Invalid id format' })
    }
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const _id = new ObjectId(req.params.id)
    const result = await products().deleteOne({ _id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    return res.status(204).send()
  } catch (err) {
    if (err.name === 'BSONTypeError') {
      return res.status(400).json({ error: 'Invalid id format' })
    }
    console.error(err)
    return res
      .status(500)
      .json({ error: 'Internal server error', details: err.message })
  }
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3000

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message)
    process.exit(1)
  })
