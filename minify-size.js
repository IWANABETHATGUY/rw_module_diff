const fs = require("fs");
const path = require("path");
const walk = require("acorn-walk");
const acorn = require("acorn");

const isWebpack = process.env.W !== undefined;

const rspack = fs.readFileSync(path.resolve(__dirname, "./rspack-min.js")).toString();
const webpack = fs.readFileSync(path.resolve(__dirname, "./webpack-min.js")).toString();


// console.log(file)

// console.log(file.search('"__esModule",{value:!0}'))
function getExportInfo(file, isWebpack) {
  const exportInfo = {}
  let targetNode = null;
  let range = 0;
  walk.simple(acorn.parse(file, { ecmaVersion: "latest" }), {
    VariableDeclarator(node) {
      if (range < node.end - node.start) {
        range = node.end - node.start
        targetNode = node
      }
    },
  });

    isFirst = false
    let properties = targetNode.init.properties;
    for (let prop of properties) {
      const request = prop.key.value;
      const value = prop.value
      exportInfo[request] = [value.start, value.end]
    }
    return exportInfo

}

const rspackExportInfo = getExportInfo(rspack)
const webpackExportInfo = getExportInfo(webpack)


let sum = 0
Object.keys(rspackExportInfo).forEach(key => {
  if (webpackExportInfo[key] == undefined) {
    const r = rspackExportInfo[key]
      console.log(`${key}: \n, ${r[1] - r[0]}`)
      sum += (r[1] - r[0])
  } else {
    const r = rspackExportInfo[key]
    const w = webpackExportInfo[key]

    const rsize = r[1] - r[0]
    const wsize = w[1] - w[0]
    console.log(`${key}: \n, ${rsize - wsize}`)
    sum += (rsize - wsize)
  }
})

console.log(sum)