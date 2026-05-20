import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, 'public')
const app = express()

// Your API routes (the /api/time route is from the last article).
app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() })
})

// Any /api request that didn't match above is a real 404, not a frontend route.
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Serve the frontend's built files from the server's public folder.
app.use(express.static(publicDir))

// Catch-all: hand anything else to index.html so the frontend's router takes over.
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))
