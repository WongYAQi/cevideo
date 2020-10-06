/**
 * Express 服务器
 */

const express = require('express')
const app = express()
const fs = require('fs')
const mime = require('mime')
const cors = require('cors')

app.use(cors())

app.get('/load', function(req: any, res: any) {
  const { src } = req.query
  fs.stat(src, function (err: any, stats: any) {
    if (err) {
      console.log(err)
      res.send(err)
    }
    let type = mime.getType(src)
    let fileSize = stats.size
    let range = req.headers.range
    if (range) {
      let parts = range.replace(/bytes=/, '').split('-')
      let start = parseInt(parts[0], 10)
      let end = parts[1] ? parseInt(parts[1]) : fileSize - 1;
      let chunksize = (end - start) + 1
      let stream = fs.createReadStream(src, { start, end })
      let head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': type
      }
      res.writeHead(206, head)
      stream.pipe(res)
      stream.on('error', function (error: any) {
        res.send(error)
      })
    } else {
      let head = {
        'Content-Length': fileSize,
        'Content-Type': type
      }
      res.writeHead(200, head)
      fs.createReadStream(src).pipe(res)
    }
  })
})

export default app
