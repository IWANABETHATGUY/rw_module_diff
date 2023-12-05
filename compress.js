const {minify} = require('terser')
const fs = require('fs')
const path = require('path')

;(async () => {
  const file = fs.readFileSync(path.resolve(__dirname, "rspack.js")).toString();
  const res = await minify(file, {mangle: true, module: false, toplevel: true})
  console.log('rspack')
  console.log(res.code.length)
  fs.writeFileSync("rspack-res.js", res.code, )
  
  const file2 = fs.readFileSync(path.resolve(__dirname, "webpack.js")).toString();
  const res2 = await minify(file2, {mangle: true, module: false, toplevel: true})
  console.log(res2.code.length)
  fs.writeFileSync("webpack-res.js", res2.code, )


  const file3 = fs.readFileSync(path.resolve(__dirname, "core.mjs")).toString();
  const res3 = await minify(file3, {mangle: true, module: false, toplevel: true})
  console.log(res3.code.length)
  fs.writeFileSync("core-res.js", res3.code, )
})()