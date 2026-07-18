#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')

// Load env from .env if present
try {
  require('dotenv').config()
} catch (e) {}

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 3306
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''

async function main() {
  const schemaPath = path.resolve(__dirname, 'schema.sql')
  if (!fs.existsSync(schemaPath)) {
    console.error('schema.sql introuvable dans le dossier db/.')
    process.exit(1)
  }

  const sql = fs.readFileSync(schemaPath, 'utf8')

  let conn
  try {
    conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    })

    console.log(`Connected to MySQL ${DB_HOST}:${DB_PORT} as ${DB_USER}`)
    console.log('Executing schema.sql...')

    await conn.query(sql)
    console.log('Schema executed successfully.')
  } catch (err) {
    console.error('Erreur lors de l\'initialisation de la base:', err.message || err)
    process.exitCode = 1
  } finally {
    if (conn) await conn.end()
  }
}

main()
