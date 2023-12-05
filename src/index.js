const fs = require("fs");
const path = require("path");
const walk = require("acorn-walk");
const acorn = require("acorn");

const isWebpack = process.env.W !== undefined;

const rspack = fs.readFileSync(path.resolve(__dirname, "../examples/rspack.js")).toString();
const webpack = fs.readFileSync(path.resolve(__dirname, "../examples/webpack.js")).toString();


// console.log(file)

// console.log(file.search('"__esModule",{value:!0}'))
function getExportInfo(file, isWebpack) {
  const exportInfo = {}
  let moduleDeclaration = null
  let ast = acorn.parse(file, { ecmaVersion: "latest",  });
  function visitor(node, ancestor) {
    if (moduleDeclaration !== null) {
      return;
    }
    if (node.params.length === 3) {
      if (node.params[0].name === "__unused_webpack_module") {
        for (let i = ancestor.length - 1; i >= 0; i--) {
          let a = ancestor[i]
          if (a.type === "ObjectExpression") {
            moduleDeclaration = a;
            return;
          }
        }
      }
    }
  }
  walk.ancestor(ast,  {
    FunctionExpression: visitor,
    ArrowFunctionExpression: visitor
  })

  if (moduleDeclaration === null) {
    return null;
  }
  const properties = moduleDeclaration.properties;
  for (let prop of properties) {
    const request = prop.key.value;
    let e;
    if (isWebpack) {
      e = getExportFromWebpack(prop.value);
    } else {
       e = getExportFromRspack(prop.value);
    }
    exportInfo[request] = e;
  }
  return exportInfo

}

const webpackExportInfo = getExportInfo(webpack, true)
const rspackExportInfo = getExportInfo(rspack, true)
console.log(Object.keys(webpackExportInfo).length)
console.log(Object.keys(rspackExportInfo).length)
moduleDiff(rspackExportInfo, webpackExportInfo)
function moduleDiff(rspackExportInfo, webpackExportInfo) {
  Object.keys(rspackExportInfo).forEach(key => {
    if (webpackExportInfo[key] == undefined) {
      console.log(`${key}:`)
    } else {
      const r = rspackExportInfo[key]
      const w = webpackExportInfo[key]
      let diff = []
      for (let i = 0; i  < r.length; i++) {
        let symbol = r[i]
        if (!w.includes(symbol)) {
          diff.push(symbol)
        }
      }

      if (diff.length) {
        console.log(`${key}: \n ${JSON.stringify(diff)}`)
      }
    }
  })
}



function getExportFromRspack(func) {
  let ret = [];
  walk.simple(func, {
    CallExpression(node) {
      let callee = node.callee;
      if (
        callee.type === "MemberExpression" &&
        callee.object.name === "Object" &&
        callee.property.name === "defineProperty"
      ) {
        const arguments = node.arguments;
        if (arguments[0].type === "Identifier" && arguments[0].name === "exports") {
          ret.push(arguments[1].value);
        }
      }
      if (
        callee.type === "Identifier" &&
        callee.name === "_export" &&
        node.arguments[0].type === "Identifier" &&
        node.arguments[0].name === "exports"
      ) {
        const obj = node.arguments[1];
        let properties = obj.properties;
        for (let prop of properties) {
          ret.push(prop.key.name);
        }
      }
    },
  });
  return ret.filter(item => item !== "__esModule");
}


function getExportFromWebpack(func) {
  let ret = [];
  walk.simple(func, {
    CallExpression(node) {
      let callee = node.callee;
      if (
        callee.type === "MemberExpression" &&
        callee.object.name === "__webpack_require__" &&
        callee.property.name === "d"
      ) {
        const arguments = node.arguments;
        if (arguments[0].type === "Identifier" && arguments[0].name === "__webpack_exports__") {
          const obj = node.arguments[1];
          let properties = obj.properties;
          for (let prop of properties) {
            ret.push(prop.key.name || prop.key.value);
          }
        }
      }
    },
  });
  return ret
}
