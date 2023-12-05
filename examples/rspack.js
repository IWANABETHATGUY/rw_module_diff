(function() {
var __webpack_modules__ = {
"./a/c.js": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
'use strict';
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  'test': function() { return test; }
});
function __WEBPACK_DEFAULT_EXPORT__(){}
 function test() {}
},
"./a/index.js": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
'use strict';
__webpack_require__.r(__webpack_exports__);
/* harmony import */var _lib_js__WEBPACK_IMPORTED_MODULE_0_ = __webpack_require__(/* ./lib.js */"./a/lib.js");

_lib_js__WEBPACK_IMPORTED_MODULE_0_["test"];
},
"./a/lib.js": function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
'use strict';
__webpack_require__.r(__webpack_exports__);
/* harmony import */var _c_js__WEBPACK_IMPORTED_MODULE_0_ = __webpack_require__(/* ./c.js */"./a/c.js");
__webpack_require__.es(_c_js__WEBPACK_IMPORTED_MODULE_0_, __webpack_exports__);

},

}
// The module cache
 var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
// Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
      return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
       exports: {}
      });
      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
// Return the exports of the module
 return module.exports;

}
// es
(function() {
__webpack_require__.es = function (from, to) {
	Object.keys(from).forEach(function (k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k))
			Object.defineProperty(to, k, {
				enumerable: true,
				get: function () {
					return from[k];
				}
			});
	});
	return from;
};

})();
// webpack/runtime/has_own_property
(function() {
__webpack_require__.o = function (obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

})();
// webpack/runtime/define_property_getters
(function() {
__webpack_require__.d = function(exports, definition) {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/make_namespace_object
(function() {
// define __esModule on exports
__webpack_require__.r = function(exports) {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};

})();
var __webpack_exports__ = __webpack_require__("./a/index.js");
})()

//# sourceMappingURL=main.js.map
