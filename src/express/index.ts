/**
 * Express 服务器
 */

import { Request, Response } from 'express'
import fs from 'fs'
process.env.FLUENTFFMPEG_COV = ''

const express = require('express')
const app = express()
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
  var ffprobePathDev = path.join(
    __dirname,
    '../node_modules/ffprobe-static',
    'bin',
    platform,
    arch,
    platform === 'win32' ? 'ffprobe.exe' : 'ffprobe'
  )
  var ffprobePath = process.env.NODE_ENV === 'development' ? ffprobePathDev : ffprobeStatic
  ffprobe(src, { path: ffprobePath }).then((r: any) => {
    res.send(r)
  })
})

/**
 * 获取文件夹信息
 * @return 返回视频相关的文件
 */
app.get('/stat', function (req: Request, res: Response) {
  let src = req.query.src as string | undefined
  const filterFolder = ['$RECYCLE.BIN', 'System Volume Information']
  const suffix = ['.mp4']
  if (!src) res.send('请输入参数 src')
  else {
    fs.readdir(src, { withFileTypes: true }, function (err, files) {
      if (err) {
        res.send(err)
      }
      let r: { name: string, type: 'file' | 'directory' }[] = []
      r = files.filter(o => !filterFolder.includes(o.name))
        .filter(o => o.isDirectory() || suffix.some(t => o.name.endsWith(t)))
        .map(o => ({
          name: o.name,
          type: o.isFile() ? 'file' : 'directory'
        }))
      r = r.sort((a, b) => {
        return a.type.charCodeAt(0) - b.type.charCodeAt(0)
          || a.name.charCodeAt(0) - b.name.charCodeAt(0)
      })
      r.unshift({ name: '..', type: 'directory' })
      res.send(r)
    })
  }
})

app.get('/root', function (req: Request, res: Response) {
  let promises = []
  for (let i=65;i<=90;i++){
    let v = String.fromCharCode(i) + ':\\'
    promises.push(new Promise((resolve, reject) => {
      fs.readdir(v, function(err, files) {
        resolve(!err ? v : '')
      })
    }))
  }
  Promise.all(promises).then(r => {
    res.send(r.filter(o => o !== '').map(o => ({
      type: 'directory',
      name: o
    })))
  })
})

export default app
