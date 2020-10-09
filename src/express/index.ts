/**
 * Express 服务器
 */

process.env.FLUENTFFMPEG_COV = ''

const express = require('express')
const app = express()
const fs = require('fs')
const mime = require('mime')
const cors = require('cors')
const ffprobe = require('ffprobe')
const ffprobeStatic = require('ffprobe-static')
var os = require('os');
var path = require('path');

var platform = os.platform();
if (platform !== 'darwin' && platform !=='linux' && platform !== 'win32') {
  console.error('Unsupported platform.');
  process.exit(1);
}

var arch = os.arch();
if (platform === 'darwin' && arch !== 'x64') {
  console.error('Unsupported architecture.');
  process.exit(1);
}


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

app.get('/info', function (req: any, res: any) {
  const { src } = req.query
  var ffprobePath = path.join(
    __dirname,
    process.env.NODE_ENV === 'development' ? '../node_modules/ffprobe-static' : '',
    'bin',
    platform,
    arch,
    platform === 'win32' ? 'ffprobe.exe' : 'ffprobe'
  )
  ffprobe(src, { path: ffprobePath }).then((r: any) => {
    res.send(r)
  })
})

export default app
