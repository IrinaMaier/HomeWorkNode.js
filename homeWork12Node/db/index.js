import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

let client
let db

export async function connectToDb() {
  const uri = process.env.MONGODB_URI
  const dbName = process.env.DB_NAME

  if (!uri || !dbName) {
    throw new Error('MONGODB_URI or DB_NAME is missing in .env')
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  await client.connect()
  db = client.db(dbName)
  console.log(`Connected to MongoDB: ${db.databaseName}`)
  return db
}

export function getDb() {
  if (!db) throw new Error('DB is not initialized. Call connectToDb() first.')
  return db
}

export async function closeDb() {
  if (client) await client.close()
}
