const fs = require('fs')
const path = require('path')
const basePath = '/Users/bytedance/Documents/bytedance/muse'

const previous = fs.readFileSync(path.resolve(__dirname, "pre.txt")).toString()
const current = fs.readFileSync(path.resolve(__dirname, "cur.txt")).toString()

let preList = previous.split('\n');
let curList = current.split('\n');
console.log(preList.length)
console.log(curList.length)
let previousSet = new Set(preList)
let currentSet = new Set(curList)
console.log(previousSet.size)
console.log(currentSet.size)
currentSet.forEach(item => {

  if (!previousSet.has(item) ) {
    console.log(path.resolve(basePath, item))
  }
})

