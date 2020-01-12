(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-plugin-universal-import/universalImport");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(17);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHasBabelPlugin = exports.ReportChunks = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _requireUniversalModule = __webpack_require__(44);

Object.defineProperty(exports, 'CHUNK_NAMES', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.CHUNK_NAMES;
  }
});
Object.defineProperty(exports, 'MODULE_IDS', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.MODULE_IDS;
  }
});

var _reportChunks = __webpack_require__(46);

Object.defineProperty(exports, 'ReportChunks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reportChunks)["default"];
  }
});
exports["default"] = universal;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(25);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(26);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _vm = __webpack_require__(47);

var _requireUniversalModule2 = _interopRequireDefault(_requireUniversalModule);

var _utils = __webpack_require__(18);

var _helpers = __webpack_require__(48);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var hasBabelPlugin = false;

var isHMR = function isHMR() {
  return (// $FlowIgnore
    module.hot && (false)
  );
};

var setHasBabelPlugin = exports.setHasBabelPlugin = function setHasBabelPlugin() {
  hasBabelPlugin = true;
};

function universal(asyncModule) {
  var _class, _temp;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var userRender = opts.render,
      _opts$loading = opts.loading,
      Loading = _opts$loading === undefined ? _utils.DefaultLoading : _opts$loading,
      _opts$error = opts.error,
      Err = _opts$error === undefined ? _utils.DefaultError : _opts$error,
      _opts$minDelay = opts.minDelay,
      minDelay = _opts$minDelay === undefined ? 0 : _opts$minDelay,
      _opts$alwaysDelay = opts.alwaysDelay,
      alwaysDelay = _opts$alwaysDelay === undefined ? false : _opts$alwaysDelay,
      _opts$testBabelPlugin = opts.testBabelPlugin,
      testBabelPlugin = _opts$testBabelPlugin === undefined ? false : _opts$testBabelPlugin,
      _opts$loadingTransiti = opts.loadingTransition,
      loadingTransition = _opts$loadingTransiti === undefined ? true : _opts$loadingTransiti,
      options = _objectWithoutProperties(opts, ['render', 'loading', 'error', 'minDelay', 'alwaysDelay', 'testBabelPlugin', 'loadingTransition']);

  var renderFunc = userRender || (0, _utils.createDefaultRender)(Loading, Err);
  var isDynamic = hasBabelPlugin || testBabelPlugin;
  options.isDynamic = isDynamic;
  options.usesBabelPlugin = hasBabelPlugin;
  options.modCache = {};
  options.promCache = {};
  return _temp = _class = function (_React$Component) {
    _inherits(UniversalComponent, _React$Component);

    _createClass(UniversalComponent, [{
      key: 'requireAsyncInner',
      value: function requireAsyncInner(requireAsync, props, state, context, isMount) {
        var _this2 = this;

        if (!state.mod && loadingTransition) {
          this.update({
            mod: null,
            props: props
          }); // display `loading` during componentWillReceiveProps
        }

        var time = new Date();
        requireAsync(props, context).then(function (mod) {
          var state = {
            mod: mod,
            props: props,
            context: context
          };
          var timeLapsed = new Date() - time;

          if (timeLapsed < minDelay) {
            var extraDelay = minDelay - timeLapsed;
            return setTimeout(function () {
              return _this2.update(state, isMount);
            }, extraDelay);
          }

          _this2.update(state, isMount);
        })["catch"](function (error) {
          return _this2.update({
            error: error,
            props: props,
            context: context
          });
        });
      }
    }, {
      key: 'handleBefore',
      value: function handleBefore(isMount, isSync) {
        var isServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.props.onBefore) {
          var onBefore = this.props.onBefore;
          var info = {
            isMount: isMount,
            isSync: isSync,
            isServer: isServer
          };
          onBefore(info);
        }
      }
    }, {
      key: 'handleAfter',
      value: function handleAfter(state, isMount, isSync, isServer) {
        var mod = state.mod,
            error = state.error;

        if (mod && !error) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });

          if (this.props.onAfter) {
            var onAfter = this.props.onAfter;
            var info = {
              isMount: isMount,
              isSync: isSync,
              isServer: isServer
            };
            onAfter(info, mod);
          }
        } else if (error && this.props.onError) {
          this.props.onError(error);
        }

        this.setState(state);
      } // $FlowFixMe

    }, {
      key: 'init',
      value: function init(props, context) {
        var _req = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            addModule = _req.addModule,
            requireSync = _req.requireSync,
            requireAsync = _req.requireAsync,
            asyncOnly = _req.asyncOnly;

        var mod = void 0;

        try {
          mod = requireSync(props, context);
        } catch (error) {
          return (0, _helpers.__update)(props, {
            error: error,
            props: props,
            context: context
          }, this._initialized);
        }

        this._asyncOnly = asyncOnly;
        var chunkName = addModule(props); // record the module for SSR flushing :)

        if (context.report) {
          context.report(chunkName);
        }

        if (mod || _utils.isServer) {
          this.handleBefore(true, true, _utils.isServer);
          return (0, _helpers.__update)(props, {
            asyncOnly: asyncOnly,
            props: props,
            mod: mod,
            context: context
          }, this._initialized, true, true, _utils.isServer);
        }

        this.handleBefore(true, false);
        this.requireAsyncInner(requireAsync, props, {
          props: props,
          asyncOnly: asyncOnly,
          mod: mod,
          context: context
        }, context, true);
        return {
          mod: mod,
          asyncOnly: asyncOnly,
          context: context,
          props: props
        };
      }
    }], [{
      key: 'preload',

      /* eslint-enable react/sort-comp */
      value: function preload(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        props = props || {};

        var _req2 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            requireAsync = _req2.requireAsync,
            requireSync = _req2.requireSync;

        var mod = void 0;

        try {
          mod = requireSync(props, context);
        } catch (error) {
          return Promise.reject(error);
        }

        return Promise.resolve().then(function () {
          if (mod) return mod;
          return requireAsync(props, context);
        }).then(function (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
          return mod;
        });
      }
      /* eslint-disable react/sort-comp */

    }, {
      key: 'preloadWeak',
      value: function preloadWeak(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        props = props || {};

        var _req3 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            requireSync = _req3.requireSync;

        var mod = requireSync(props, context);

        if (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
        }

        return mod;
      }
    }]);

    function UniversalComponent(props, context) {
      _classCallCheck(this, UniversalComponent);

      var _this = _possibleConstructorReturn(this, (UniversalComponent.__proto__ || Object.getPrototypeOf(UniversalComponent)).call(this, props, context));

      _this.update = function (state) {
        var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        if (!_this._initialized) return;
        if (!state.error) state.error = null;

        _this.handleAfter(state, isMount, isSync, isServer);
      };

      _this.state = _this.init(_this.props, _this.context); // $FlowFixMe

      _this.state.error = null;
      return _this;
    }

    _createClass(UniversalComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._initialized = true;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;

        if (isDynamic || this._asyncOnly) {
          var _req4 = (0, _requireUniversalModule2["default"])(asyncModule, options, this.props, prevProps),
              requireSync = _req4.requireSync,
              requireAsync = _req4.requireAsync,
              shouldUpdate = _req4.shouldUpdate;

          if (shouldUpdate(this.props, prevProps)) {
            var mod = void 0;

            try {
              mod = requireSync(this.props, this.context);
            } catch (error) {
              return this.update({
                error: error
              });
            }

            this.handleBefore(false, !!mod);

            if (!mod) {
              return this.requireAsyncInner(requireAsync, this.props, {
                mod: mod
              });
            }

            var state = {
              mod: mod
            };

            if (alwaysDelay) {
              if (loadingTransition) this.update({
                mod: null
              }); // display `loading` during componentWillReceiveProps

              setTimeout(function () {
                return _this3.update(state, false, true);
              }, minDelay);
              return;
            }

            this.update(state, false, true);
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._initialized = false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            isLoading = _props.isLoading,
            userError = _props.error,
            props = _objectWithoutProperties(_props, ['isLoading', 'error']);

        var _state = this.state,
            mod = _state.mod,
            error = _state.error;
        return renderFunc(props, mod, isLoading, userError || error);
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, currentState) {
        var _req5 = (0, _requireUniversalModule2["default"])(asyncModule, options, nextProps, currentState.props),
            requireSync = _req5.requireSync,
            shouldUpdate = _req5.shouldUpdate;

        if (isHMR() && shouldUpdate(currentState.props, nextProps)) {
          var mod = requireSync(nextProps, currentState.context);
          return _extends({}, currentState, {
            mod: mod
          });
        }

        return null;
      }
    }]);

    return UniversalComponent;
  }(_react2["default"].Component), _class.contextTypes = {
    store: _propTypes2["default"].object,
    report: _propTypes2["default"].func
  }, _temp;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(16)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-static");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "@babel/runtime/helpers/toConsumableArray"
var toConsumableArray_ = __webpack_require__(3);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_);

// EXTERNAL MODULE: external "seed-random"
var external_seed_random_ = __webpack_require__(21);

// EXTERNAL MODULE: external "@thebespokepixel/es-tinycolor"
var es_tinycolor_ = __webpack_require__(10);

// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/data/index.js
var data = __webpack_require__(8);

// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(39);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/utils/hash.js


var hash_hash = function hash(input) {
  return Object(external_crypto_["createHash"])('md5').update(input).digest('hex');
};

/* harmony default export */ var utils_hash = (hash_hash);
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/colors/index.js



var ffffffff = 4294967295;

var chunkConverter = function chunkConverter(chunk, max) {
  return Math.floor(parseInt(chunk, 16) * max / ffffffff);
};

var colors_hashColor = function hashColor(hash) {
  // assumes 32 character md5 hash
  var h = chunkConverter(hash.substring(0, 8), 360);
  var s = chunkConverter(hash.substring(8, 16), 100);
  var v = chunkConverter(hash.substring(16, 24), 100);
  var hsv = "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)");
  return Object(es_tinycolor_["tinycolor"])(hsv);
};
var colors_gradient = function gradient(c1, c2, steps) {
  var rgb1 = c1.toRgb();
  var rgb2 = c2.toRgb();
  return Object(data["b" /* line */])(steps).map(function (i) {
    return Object(es_tinycolor_["tinycolor"])({
      r: rgb1.r * i + rgb2.r * (1 - i),
      g: rgb1.g * i + rgb2.g * (1 - i),
      b: rgb1.b * i + rgb2.b * (1 - i)
    });
  });
};

var colors_Color = function Color(name) {
  var color = colors_hashColor(utils_hash(name));

  var value = function value() {
    return Object(es_tinycolor_["tinycolor"])(color.toRgb());
  };

  var inverse = function inverse() {
    var rgb = value().toRgb();
    var irgb = {
      r: 255 - rgb.r,
      g: 255 - rgb.g,
      b: 255 - rgb.b
    };
    return Object(es_tinycolor_["tinycolor"])(irgb);
  };

  var toString = function toString() {
    // TODO: Add an input to specify a different color coding (rgb?) for this output
    var code = value().toHsvString();
    return "Color:".concat(name, "=").concat(code);
  };

  var rgb = value().toRgbString();
  return {
    name: name,
    value: value,
    inverse: inverse,
    toString: toString,
    rgb: rgb
  };
};

/* harmony default export */ var colors = (colors_Color);
// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/colors/palletes.js
var palletes = __webpack_require__(13);

// EXTERNAL MODULE: external "@babel/runtime/helpers/objectDestructuringEmpty"
var objectDestructuringEmpty_ = __webpack_require__(40);
var objectDestructuringEmpty_default = /*#__PURE__*/__webpack_require__.n(objectDestructuringEmpty_);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/words/nouns.js
/* harmony default export */ var nouns = (["time", "year", "people", "way", "day", "man", "thing", "woman", "life", "child", "world", "school", "state", "family", "student", "group", "country", "problem", "hand", "part", "place", "case", "week", "company", "system", "program", "question", "work", "government", "number", "night", "point", "home", "water", "room", "mother", "area", "money", "story", "fact", "month", "lot", "right", "study", "book", "eye", "job", "word", "business", "issue", "side", "kind", "head", "house", "service", "friend", "father", "power", "hour", "game", "line", "end", "member", "law", "car", "city", "community", "name", "president", "team", "minute", "idea", "kid", "body", "information", "back", "parent", "face", "other", "level", "office", "door", "health", "person", "art", "war", "history", "party", "result", "change", "morning", "reason", "research", "girl", "guy", "food", "moment", "air", "teacher", "force", "education", "foot", "boy", "age", "policy", "process", "music", "market", "sense", "nation", "plan", "college", "interest", "death", "experience", "effect", "use", "class", "control", "care", "field", "development", "role", "effort", "rate", "heart", "drug", "show", "leader", "light", "voice", "wife", "police", "mind", "price", "report", "decision", "son", "view", "relationship", "town", "road", "arm", "difference", "value", "building", "action", "model", "season", "society", "tax", "director", "position", "player", "record", "paper", "space", "ground", "form", "event", "official", "matter", "center", "couple", "site", "project", "activity", "star", "table", "need", "court", "American", "oil", "situation", "cost", "industry", "figure", "street", "image", "phone", "data", "picture", "practice", "piece", "land", "product", "doctor", "wall", "patient", "worker", "news", "test", "movie", "north", "love", "support", "technology", "step", "baby", "computer", "type", "attention", "film", "republican", "tree", "source", "organization", "hair", "look", "century", "evidence", "window", "culture", "chance", "brother", "energy", "period", "course", "summer", "plant", "opportunity", "term", "letter", "condition", "choice", "rule", "daughter", "administration", "south", "husband", "congress", "floor", "campaign", "material", "population", "call", "economy", "hospital", "church", "risk", "fire", "future", "defense", "security", "bank", "west", "sport", "board", "subject", "officer", "rest", "behavior", "performance", "top", "goal", "second", "bed", "order", "author", "blood", "agency", "nature", "color", "store", "sound", "movement", "page", "race", "concern", "series", "language", "response", "animal", "factor", "decade", "article", "east", "artist", "scene", "stock", "career", "treatment", "approach", "size", "dog", "fund", "media", "sign", "thought", "list", "individual", "quality", "pressure", "answer", "resource", "meeting", "disease", "success", "cup", "amount", "ability", "staff", "character", "growth", "loss", "degree", "attack", "region", "television", "box", "TV", "trade", "deal", "election", "feeling", "standard", "bill", "message", "analysis", "benefit", "sex", "lawyer", "section", "glass", "skill", "sister", "professor", "operation", "crime", "stage", "authority", "design", "sort", "one", "knowledge", "gun", "station", "strategy", "truth", "song", "example", "environment", "leg", "public", "executive", "set", "rock", "note", "manager", "help", "network", "science", "memory", "card", "seat", "cell", "trial", "expert", "spring", "firm", "democrat", "radio", "management", "ball", "talk", "theory", "impact", "statement", "charge", "direction", "weapon", "employee", "peace", "base", "pain", "play", "measure", "interview", "chair", "fish", "camera", "structure", "politics", "bit", "weight", "candidate", "production", "trip", "evening", "conference", "unit", "style", "adult", "range", "past", "edge", "writer", "trouble", "challenge", "fear", "shoulder", "institution", "sea", "dream", "bar", "property", "stuff", "detail", "method", "magazine", "hotel", "soldier", "cause", "bag", "heat", "fall", "marriage", "surface", "purpose", "pattern", "skin", "agent", "owner", "machine", "gas", "generation", "cancer", "item", "reality", "coach", "yard", "violence", "investment", "discussion", "finger", "garden", "collection", "task", "partner", "kitchen", "consumer", "shot", "budget", "painting", "scientist", "agreement", "capital", "mouth", "victim", "newspaper", "threat", "responsibility", "attorney", "score", "account", "break", "audience", "dinner", "vote", "debate", "citizen", "majority", "wind", "mission", "customer", "speech", "option", "participant", "forest", "video", "senate", "reform", "access", "restaurant", "judge", "relation", "bird", "opinion", "credit", "corner", "version", "safety", "neighborhood", "act", "troop", "income", "species", "track", "hope", "sky", "freedom", "plane", "object", "attitude", "labor", "concept", "client", "conversation", "variety", "turn", "investigation", "researcher", "press", "conflict", "spirit", "argument", "camp", "brain", "feature", "afternoon", "weekend", "possibility", "insurance", "department", "battle", "beginning", "date", "crisis", "fan", "hole", "element", "vision", "status", "ship", "solution", "stone", "scale", "university", "driver", "attempt", "park", "spot", "lack", "ice", "boat", "sun", "distance", "wood", "truck", "return", "mountain", "survey", "tradition", "winter", "village", "sales", "communication", "run", "screen", "resident", "gold", "club", "farm", "increase", "middle", "presence", "district", "shape", "reader", "contract", "crowd", "apartment", "strength", "band", "horse", "target", "prison", "guard", "demand", "reporter", "text", "share", "tool", "vehicle", "flight", "facility", "understanding", "advantage", "leadership", "pound", "basis", "guest", "sample", "block", "protection", "while", "identity", "title", "lesson", "faith", "river", "living", "technique", "path", "ear", "shop", "folk", "principle", "border", "competition", "claim", "equipment", "critic", "aspect", "failure", "Christmas", "comment", "affair", "procedure", "chairman", "baseball", "egg", "belief", "murder", "gift", "religion", "review", "editor", "coffee", "document", "speed", "influence", "youth", "wave", "move", "quarter", "background", "reaction", "suit", "perspective", "construction", "intelligence", "connection", "shoe", "grade", "context", "committee", "mistake", "focus", "smile", "location", "clothes", "neighbor", "drive", "function", "bone", "average", "wine", "voter", "mean", "learning", "bus", "hell", "category", "victory", "key", "visit", "internet", "medicine", "tour", "photo", "finding", "classroom", "contact", "justice", "pair", "exercise", "knee", "flower", "tape", "supply", "cut", "will", "actor", "birth", "search", "democracy", "circle", "device", "progress", "front", "bottom", "island", "exchange", "studio", "lady", "colleague", "application", "neck", "damage", "plastic", "plate", "writing", "start", "expression", "football", "chicken", "army", "abuse", "theater", "map", "session", "danger", "literature", "rain", "desire", "assessment", "injury", "respect", "fuel", "leaf", "instruction", "fight", "pool", "lead", "engine", "salt", "importance", "metal", "fat", "ticket", "software", "lip", "reading", "lunch", "farmer", "sugar", "planet", "enemy", "athlete", "soul", "panel", "meaning", "mom", "instrument", "weather", "commitment", "pocket", "temperature", "surprise", "poll", "proposal", "consequence", "half", "breath", "sight", "cover", "balance", "minority", "works", "teaching", "aid", "advice", "photograph", "trail", "novel", "code", "jury", "breast", "human", "theme", "storm", "union", "desk", "thanks", "fruit", "conclusion", "shadow", "analyst", "dance", "limit", "regulation", "being", "ring", "revenue", "county", "appearance", "package", "difficulty", "bridge", "train", "e-mail", "trend", "visitor", "loan", "investor", "profit", "crew", "accident", "male", "meal", "hearing", "traffic", "muscle", "notion", "earth", "chest", "cash", "museum", "beauty", "emergency", "stress", "content", "root", "nose", "bottle", "setting", "dress", "file", "outcome", "ad", "duty", "sheet", "extent", "component", "contrast", "zone", "airport", "chief", "shirt", "pilot", "cat", "contribution", "capacity", "estate", "guide", "circumstance", "snow", "politician", "percentage", "meat", "soil", "surgery", "basketball", "golf", "chain", "address", "branch", "combination", "governor", "relief", "user", "dad", "manner", "silence", "rating", "motion", "gender", "fee", "landscape", "bowl", "frame", "host", "hall", "ocean", "row", "producer", "regime", "division", "appeal", "mirror", "tooth", "length", "topic", "variable", "telephone", "perception", "confidence", "bedroom", "secret", "debt", "tank", "nurse", "coverage", "opposition", "bond", "pleasure", "master", "era", "requirement", "check", "stand", "fun", "expectation", "wing", "struggle", "judgment", "beer", "English", "reference", "tear", "doubt", "minister", "hero", "cloud", "winner", "volume", "travel", "seed", "fashion", "pepper", "intervention", "copy", "tip", "welfare", "vegetable", "dish", "beach", "improvement", "opening", "route", "league", "core", "rise", "tie", "holiday", "resolution", "household", "abortion", "witness", "sector", "representative", "black", "incident", "flow", "faculty", "waste", "mass", "experiment", "bomb", "tone", "engineer", "wheel", "female", "promise", "cable", "jew", "cream", "secretary", "gate", "hill", "noise", "grass", "hat", "legislation", "achievement", "drink", "talent", "taste", "characteristic", "milk", "sentence", "height", "physician", "sleep", "ride", "explanation", "campus", "potential", "immigrant", "alternative", "interaction", "column", "personality", "signal", "curriculum", "honor", "passenger", "assistance", "association", "lab", "offer", "criticism", "asset", "depression", "journalist", "prayer", "scholar", "warning", "climate", "cheese", "observation", "childhood", "payment", "sir", "cigarette", "definition", "priority", "bread", "creation", "graduate", "request", "emotion", "universe", "gap", "prosecutor", "mark", "green", "airline", "library", "agenda", "factory", "selection", "roof", "expense", "initiative", "diet", "funding", "therapy", "schedule", "housing", "post", "dark", "steel", "chip", "self", "bike", "tea", "comparison", "settlement", "layer", "description", "wedding", "portion", "territory", "opponent", "link", "lake", "tension", "display", "alcohol", "saving", "gain", "desert", "error", "release", "cop", "walk", "sand", "hit", "print", "passage", "transition", "existence", "album", "participation", "atmosphere", "cycle", "whole", "resistance", "discovery", "exposure", "stream", "sale", "trust", "pot", "coalition", "tale", "knife", "phase", "present", "joke", "coat", "symptom", "manufacturer", "philosophy", "potato", "foundation", "pass", "negotiation", "good", "occasion", "dust", "investigator", "jacket", "reduction", "shift", "suicide", "touch", "substance", "discipline", "iron", "passion", "volunteer", "gene", "enforcement", "sauce", "independence", "marketing", "priest", "advance", "employer", "shock", "illness", "cap", "habit", "juice", "involvement", "Indian", "disaster", "parking", "prospect", "boss", "complaint", "championship", "mystery", "poverty", "entry", "spending", "king", "symbol", "maker", "mood", "emphasis", "boot", "entertainment", "bean", "evaluation", "creature", "commander", "arrangement", "total", "anger", "peak", "disorder", "missile", "wire", "round", "distribution", "transportation", "twin", "command", "commission", "interpretation", "breakfast", "stop", "engineering", "luck", "clinic", "veteran", "tablespoon", "tourist", "tomato", "exception", "butter", "deficit", "bathroom", "objective", "ally", "journey", "reputation", "mixture", "tower", "smoke", "dimension", "toy", "prisoner", "peer", "designer", "personnel", "educator", "relative", "immigration", "belt", "teaspoon", "birthday", "implication", "coast", "supporter", "silver", "teenager", "recognition", "retirement", "flag", "recovery", "watch", "gentleman", "corn", "moon", "throat", "salary", "observer", "publication", "crop", "strike", "phenomenon", "anxiety", "convention", "exhibition", "viewer", "pan", "consultant", "administrator", "mayor", "consideration", "CEO", "estimate", "buck", "poem", "grandmother", "enterprise", "stomach", "suggestion", "mail", "recipe", "preparation", "concert", "intention", "channel", "tube", "drawing", "protein", "absence", "roll", "jail", "diversity", "pace", "employment", "speaker", "impression", "essay", "respondent", "cake", "historian", "specialist", "origin", "approval", "mine", "drop", "count", "depth", "wealth", "disability", "shell", "professional", "pack", "onion", "deputy", "brand", "award", "criteria", "dealer", "utility", "highway", "routine", "wage", "phrase", "ingredient", "stake", "fiber", "activist", "terrorism", "refugee", "hip", "corporation", "assumption", "gear", "barrier", "provision", "killer", "gang", "chemical", "label", "teen", "index", "vacation", "advocate", "draft", "heaven", "drama", "satellite", "wonder", "clock", "chocolate", "ceiling", "advertising", "button", "bell", "rank", "darkness", "clothing", "fence", "portrait", "paint", "survival", "lawsuit", "testimony", "bunch", "beat", "burden", "chamber", "furniture", "cooperation", "string", "ceremony", "cheek", "profile", "mechanism", "penalty", "match", "resort", "destruction", "bear", "tissue", "pant", "stranger", "infection", "cabinet", "apple", "virus", "dispute", "fortune", "assistant", "statistics", "cousin", "white", "port", "electricity", "adviser", "pay", "spokesman", "incentive", "slave", "terror", "expansion", "elite", "dirt", "rice", "bullet", "bible", "chart", "decline", "conservative", "stick", "concentration", "champion", "scenario", "telescope", "reflection", "revolution", "strip", "tournament", "fiction", "lifetime", "recommendation", "senator", "salad", "boundary", "satisfaction", "journal", "bench", "lover", "awareness", "general", "deck", "pole", "mode", "dialogue", "founder", "pride", "aircraft", "delivery", "platform", "finance", "joy", "worth", "singer", "shooting", "offense", "counter", "DNA", "smell", "transfer", "protest", "crash", "craft", "treaty", "terrorist", "insight", "lie", "episode", "fault", "mix", "assault", "stair", "adventure", "proof", "headquarters", "violation", "tongue", "license", "hold", "shelter", "controversy", "entrance", "favorite", "tragedy", "net", "funeral", "profession", "establishment", "imagination", "mask", "presentation", "introduction", "representation", "deer", "partnership", "pollution", "emission", "fate", "earnings", "oven", "distinction", "segment", "poet", "variation", "comfort", "honey", "correspondent", "musician", "significance", "load", "vessel", "storage", "leather", "evolution", "tribe", "shelf", "can", "grandfather", "lawn", "buyer", "dining", "wisdom", "council", "instance", "garlic", "capability", "poetry", "celebrity", "stability", "fantasy", "plot", "framework", "gesture", "psychology", "counselor", "chapter", "fellow", "divorce", "pipe", "math", "shade", "tail", "obligation", "angle", "palm", "custom", "economist", "soup", "celebration", "composition", "pile", "carbon", "scheme", "crack", "frequency", "tobacco", "survivor", "psychologist", "galaxy", "ski", "limitation", "appointment", "preference", "meter", "explosion", "arrest", "fighter", "admission", "hunter", "friendship", "aide", "infant", "porch", "tendency", "uniform", "formation", "scholarship", "reservation", "efficiency", "mall", "scandal", "heel", "privacy", "fabric", "contest", "proportion", "guideline", "rifle", "maintenance", "conviction", "trick", "tent", "examination", "publisher", "French", "myth", "cow", "standing", "tennis", "nerve", "barrel", "bombing", "membership", "ratio", "menu", "purchase", "lifestyle", "humor", "glove", "suspect", "narrative", "photographer", "helicopter", "catholic", "provider", "delay", "stroke", "scope", "punishment", "handful", "horizon", "girlfriend", "cholesterol", "adjustment", "taxpayer", "principal", "motivation", "assignment", "restriction", "Palestinian", "laboratory", "workshop", "auto", "cotton", "motor", "flavor", "sequence", "demonstration", "jet", "consumption", "blade", "medication", "cabin", "edition", "valley", "pitch", "pine", "manufacturing", "christian", "complex", "chef", "discrimination", "German", "boom", "heritage", "God", "shit", "lemon", "economics", "nut", "legacy", "extension", "fly", "battery", "arrival", "orientation", "inflation", "flame", "cluster", "wound", "shower", "flesh", "garage", "operator", "instructor", "comedy", "mortgage", "sanction", "habitat", "grain", "consciousness", "measurement", "province", "ethics", "nomination", "permission", "actress", "summit", "acid", "odds", "frustration", "medium", "grant", "shore", "lung", "discourse", "basket", "competitor", "powder", "ghost", "cookie", "carrier", "swing", "orange", "pet", "miracle", "rhythm", "sin", "charity", "script", "tactic", "identification", "transformation", "headline", "venture", "invasion", "military", "piano", "grocery", "intensity", "blanket", "margin", "hay", "mouse", "rope", "prescription", "brick", "patch", "consensus", "horror", "recording", "painter", "pie", "sake", "gaze", "courage", "pregnancy", "clue", "win", "confusion", "slice", "occupation", "coal", "criminal", "formula", "uncle", "square", "captain", "gallery", "soccer", "defendant", "tunnel", "fitness", "lap", "grave", "toe", "container", "virtue", "architect", "makeup", "inquiry", "rose", "indication", "rail", "anniversary", "couch", "alliance", "hypothesis", "boyfriend", "mess", "legend", "adolescent", "norm", "remark", "reward", "organ", "laughter", "northwest", "counseling", "receiver", "ritual", "insect", "salmon", "favor", "combat", "stem", "surgeon", "physics", "rape", "counsel", "brush", "jeans", "log", "pill", "sculpture", "compound", "flour", "slope", "presidency", "serving", "bishop", "cry", "acceptance", "collapse", "pump", "candy", "evil", "final", "medal", "export", "midnight", "curve", "integrity", "logic", "essence", "closet", "interior", "corridor", "pitcher", "snake", "cross", "weakness", "pig", "cold", "T-shirt", "unemployment", "civilization", "pop", "correlation", "humanity", "developer", "excitement", "beef", "stretch", "architecture", "elbow", "muslim", "allegation", "airplane", "duck", "dose", "lecture", "van", "bay", "suburb", "sandwich", "trunk", "rumor", "implementation", "cloth", "effectiveness", "lens", "reach", "inspector", "fraud", "companion", "nail", "array", "rat", "hallway", "cave", "southwest", "monster", "obstacle", "encounter", "herb", "integration", "crystal", "recession", "wish", "motive", "flood", "pen", "ownership", "nightmare", "notice", "inspection", "supervisor", "arena", "laugh", "diagnosis", "possession", "basement", "prosecution", "announcement", "warrior", "prediction", "bacteria", "questionnaire", "mud", "infrastructure", "privilege", "temple", "broadcast", "wrist", "curtain", "monitor", "pond", "domain", "guilt", "cattle", "playoff", "skirt", "database", "aim", "limb", "ideology", "harm", "railroad", "radiation", "horn", "innovation", "strain", "guitar", "replacement", "dancer", "amendment", "pad", "transmission", "grace", "colony", "adoption", "slide", "civilian", "towel", "particle", "glance", "prize", "landing", "conduct", "blue", "bat", "alarm", "festival", "grip", "freshman", "sweat", "European", "separation", "southeast", "ballot", "rhetoric", "vitamin", "enthusiasm", "wilderness", "mandate", "pause", "excuse", "uncertainty", "chaos", "canvas", "lobby", "format", "trait", "currency", "turkey", "reserve", "beam", "astronomer", "corruption", "contractor", "doctrine", "thumb", "unity", "compromise", "rush", "complexity", "fork", "disk", "suspicion", "lock", "finish", "residence", "shame", "sidewalk", "Olympics", "signature", "rebel", "spouse", "fluid", "pension", "sodium", "blow", "promotion", "forehead", "hook", "detective", "traveler", "compensation", "exit", "attraction", "pickup", "needle", "belly", "portfolio", "shuttle", "engagement", "ankle", "transaction", "counterpart", "rider", "doll", "noon", "exhibit", "carbohydrate", "liberty", "poster", "theology", "oxygen", "magic", "sum", "businessman", "determination", "donor", "pastor", "jazz", "opera", "Japanese", "bite", "acquisition", "pit", "wildlife", "giant", "primary", "equity", "doorway", "departure", "elevator", "guidance", "happiness", "statue", "pursuit", "repair", "gym", "clerk", "Israeli", "envelope", "destination", "fist", "exploration", "bath", "rescue", "indicator", "sunlight", "feedback", "spectrum", "laser", "expertise", "tune", "hint", "parade", "realm", "ban", "therapist", "pizza", "recipient", "bias", "metaphor", "candle", "handle", "worry", "entity", "feel", "lamp", "garbage", "servant", "addition", "inside", "reception", "chin", "necessity", "racism", "starter", "gravity", "prevention", "Arab", "performer", "intent", "inventory", "assembly", "silk", "magnitude", "hostage", "collector", "popularity", "kiss", "alien", "equation", "angel", "switch", "offering", "rage", "photography", "toilet", "Russian", "wake", "gathering", "automobile", "dawn", "tide", "romance", "hardware", "pillow", "kit", "cook", "spread", "continent", "circuit", "sink", "ruling", "shortage", "trap", "fool", "deadline", "ranch", "diamond", "credibility", "import", "sentiment", "cart", "elder", "pro", "inspiration", "quantity", "trailer", "mate", "genius", "monument", "bid", "quest", "sacrifice", "invitation", "accuracy", "juror", "broker", "treasure", "loyalty", "gasoline", "output", "nominee", "diabetes", "jaw", "grief", "rocket", "inmate", "dynamics", "bow", "senior", "dignity", "carpet", "bubble", "buddy", "barn", "sword", "flash", "glory", "drum", "queen", "dilemma", "input", "northeast", "liability", "merchant", "stadium", "defeat", "withdrawal", "refrigerator", "nest", "lane", "ancestor", "steam", "accent", "escape", "cage", "shrimp", "homeland", "rack", "costume", "wolf", "courtroom", "statute", "cartoon", "productivity", "seal", "bug", "aunt", "agriculture", "bankruptcy", "vaccine", "bonus", "collaboration", "orbit", "patience", "patrol", "willingness", "revelation", "rent", "jewelry", "trace", "wagon", "reliability", "ass", "bush", "clip", "thigh", "bull", "drawer", "sheep", "coordinator", "runner", "empire", "cab", "exam", "documentary", "biology", "web", "conspiracy", "catch", "casualty", "republic", "execution", "whale", "instinct", "teammate", "aluminum", "ministry", "verdict", "skull", "self-esteem", "ease", "bee", "practitioner", "loop", "puzzle", "mushroom", "subsidy", "mathematics", "mechanic", "jar", "earthquake", "pork", "creativity", "dessert", "sympathy", "fisherman", "isolation", "sock", "jump", "entrepreneur", "syndrome", "bureau", "workplace", "ambition", "touchdown", "breeze", "christianity", "translation", "gut", "booth", "helmet", "waist", "lion", "accomplishment", "panic", "cast", "cliff", "cord", "cocaine", "illusion", "appreciation", "commissioner", "flexibility", "casino", "tumor", "pulse", "equivalent", "donation", "diary", "sibling", "irony", "spoon", "midst", "alley", "soap", "rival", "pin", "hockey", "supplier", "momentum", "purse", "liquid", "icon", "elephant", "legislature", "associate", "franchise", "bicycle", "fever", "filter", "rabbit", "coin", "organism", "sensation", "stay", "minimum", "conservation", "backyard", "charter", "stove", "consent", "reminder", "placement", "dough", "grandchild", "dam", "outfit", "columnist", "workout", "patent", "quote", "trash", "hormone", "texture", "pencil", "frontier", "spray", "bet", "custody", "banker", "beast", "oak", "notebook", "attendance", "speculation", "shark", "mill", "installation", "tag", "fleet", "catalog", "outsider", "stance", "sensitivity", "debut", "confrontation", "ideal", "constitution", "trainer", "Thanksgiving", "scent", "stack", "eyebrow", "sack", "tray", "pioneer", "textbook", "dot", "wheat", "kingdom", "aisle", "protocol", "marketplace", "terrain", "pasta", "genre", "merit", "planner", "chunk", "discount", "ladder", "jungle", "migration", "hurricane", "retailer", "coup", "ambassador", "density", "curiosity", "aggression", "stimulus", "journalism", "robot", "feather", "sphere", "publicity", "major", "well-being", "validity", "ecosystem", "collar", "weed", "compliance", "streak", "builder", "glimpse", "premise", "specialty", "artifact", "monkey", "mentor", "listener", "lightning", "sleeve", "disappointment", "rib", "debris", "rod", "liberal", "ash", "parish", "slavery", "commodity", "cure", "mineral", "hunger", "equality", "cemetery", "harassment", "fame", "likelihood", "carrot", "toll", "rim", "wheelchair", "squad", "processor", "sponsor", "grin", "chill", "refuge", "legislator", "rally", "programming", "outlet", "vendor", "peanut", "intellectual", "conception", "auction", "steak", "triumph", "shareholder", "conscience", "calculation", "interval", "jurisdiction", "constraint", "expedition", "similarity", "butt", "lid", "bulk", "mortality", "conversion", "patron", "liver", "harmony", "tolerance", "instant", "goat", "blessing", "banana", "running", "palace", "peasant", "grandparent", "lawmaker", "supermarket", "cruise", "plain", "calendar", "widow", "deposit", "beard", "brake", "screening", "impulse", "fur", "predator", "forum", "removal", "autonomy", "thread", "landmark", "offender", "fraction", "tourism", "threshold", "suite", "regulator", "straw", "globe", "objection", "chemistry", "blast", "denial", "rental", "fragment", "warmth", "undergraduate", "headache", "policeman", "yield", "projection", "mention", "graduation", "mansion", "regard", "grape", "cottage", "driveway", "charm", "sexuality", "clay", "balloon", "invention", "ego", "fare", "homework", "disc", "sofa", "guarantee", "availability", "radar", "leave", "permit", "sweater", "rehabilitation", "retreat", "molecule", "youngster", "premium", "accountability", "fatigue", "marker", "bucket", "confession", "marble", "twist", "defender", "transport", "surveillance", "technician", "arrow", "trauma", "ribbon", "meantime", "harvest", "spy", "slot", "riot", "nutrient", "citizenship", "sovereignty", "ridge", "lighting", "contributor", "transit", "seminar", "electronics", "shorts", "accusation", "cue", "bride", "biography", "hazard", "tile", "foreigner", "launch", "convenience", "delight", "timber", "plea", "bulb", "devil", "bolt", "cargo", "spine", "seller", "dock", "fog", "diplomat", "summary", "missionary", "epidemic", "warehouse", "butterfly", "bronze", "praise", "vacuum", "stereotype", "sensor", "laundry", "manual", "pistol", "plaintiff", "apology"]);
var pluralExceptions = {
  family: 'families',
  country: 'countries',
  company: 'companies',
  money: 'monies',
  story: 'stories',
  study: 'studies',
  business: 'businesses',
  city: 'cities',
  community: 'communities',
  body: 'bodies',
  history: 'histories',
  party: 'parties',
  research: 'research',
  policy: 'policies',
  process: 'processes',
  "class": 'classes',
  society: 'societies',
  activity: 'activities',
  industry: 'industries',
  news: 'news',
  technology: 'technologies',
  baby: 'babies',
  century: 'centuries',
  energy: 'energies',
  opportunity: 'opportunities',
  south: 'souths',
  congress: 'congresses',
  economy: 'economies',
  church: 'churches',
  security: 'securities',
  agency: 'agencies',
  series: 'serieses',
  approach: 'approaches',
  quality: 'qualities',
  success: 'successes',
  ability: 'abilities',
  loss: 'losses',
  analysis: 'analyses',
  glass: 'glasses',
  authority: 'authorities',
  strategy: 'strategies',
  memory: 'memories',
  theory: 'theories',
  fish: 'fishes',
  property: 'properties',
  gas: 'gasses',
  reality: 'realities',
  coach: 'coaches',
  responsibility: 'responsibilities',
  majority: 'majorities',
  speech: 'speeches',
  access: 'accesses',
  safety: 'safeties',
  species: 'species',
  sky: 'skies',
  variety: 'varieties',
  press: 'presses',
  possibility: 'possibilities',
  crisis: 'crises',
  status: 'statuses',
  university: 'universities',
  sales: 'sales',
  facility: 'facilities',
  basis: 'basises',
  identity: 'identities',
  Christmas: 'Christmases',
  focus: 'foci',
  clothes: 'clothes',
  bus: 'busses',
  category: 'categories',
  victory: 'victories',
  supply: 'supplies',
  birth: 'births',
  search: 'searches',
  democracy: 'democracies',
  progress: 'progresses',
  lady: 'ladies',
  army: 'armies',
  injury: 'injuries',
  lunch: 'lunches',
  enemy: 'enemies',
  minority: 'minorities',
  works: 'works',
  jury: 'juries',
  thanks: 'thanks',
  county: 'counties',
  difficulty: 'difficulties',
  earth: 'earths',
  cash: 'cash',
  beauty: 'beauties',
  emergency: 'emergencies',
  stress: 'stresses',
  dress: 'dresses',
  duty: 'duties',
  capacity: 'capacities',
  surgery: 'surgeries',
  address: 'addresses',
  branch: 'branches',
  English: 'English',
  copy: 'copies',
  dish: 'dishes',
  beach: 'beaches',
  witness: 'witnesses',
  faculty: 'faculties',
  mass: 'masses',
  secretary: 'secretaries',
  grass: 'grasses',
  campus: 'campuses',
  personality: 'personalities',
  priority: 'priorities',
  library: 'libraries',
  factory: 'factories',
  therapy: 'therapies',
  territory: 'territories',
  discovery: 'discoveries',
  philosophy: 'philosophies',
  pass: 'passes',
  touch: 'touches',
  illness: 'illnesses',
  boss: 'bosses',
  mystery: 'mysteries',
  poverty: 'poverties',
  entry: 'entries',
  emphasis: 'emphases',
  ally: 'allies',
  journey: 'journies',
  recovery: 'recoveries',
  watch: 'watches',
  salary: 'salaries',
  anxiety: 'anxieties',
  diversity: 'diversities',
  disability: 'disabilities',
  deputy: 'deputies',
  utility: 'utilities',
  darkness: 'darknesses',
  testimony: 'testimonies',
  bunch: 'bunches',
  ceremony: 'ceremonies',
  penalty: 'penalties',
  match: 'matches',
  virus: 'viruses',
  statistics: 'statistics',
  electricity: 'electricities',
  boundary: 'boundaries',
  bench: 'benches',
  awareness: 'awarenesses',
  delivery: 'deliveries',
  crash: 'crashes',
  treaty: 'treaties',
  headquarters: 'headquarters',
  controversy: 'controversies',
  tragedy: 'tragedies',
  earnings: 'earnings',
  honey: 'honies',
  capability: 'capabilities',
  poetry: 'poetries',
  celebrity: 'celebrities',
  stability: 'stabilities',
  fantasy: 'fantasies',
  psychology: 'psychologies',
  frequency: 'frequencies',
  galaxy: 'galaxies',
  porch: 'porches',
  tendency: 'tendencies',
  efficiency: 'efficiencies',
  privacy: 'privacies',
  French: 'French',
  tennis: 'tennises',
  delay: 'delays',
  laboratory: 'laboratories',
  pitch: 'pitches',
  legacy: 'legacies',
  fly: 'flies',
  battery: 'batteries',
  flesh: 'flesh',
  comedy: 'comedies',
  consciousness: 'consciousnesses',
  ethics: 'ethics',
  actress: 'actresses',
  odds: 'odds',
  charity: 'charities',
  military: 'militaries',
  grocery: 'groceries',
  intensity: 'intensities',
  hay: 'hay',
  patch: 'patches',
  consensus: 'consensuses',
  pregnancy: 'pregnancies',
  gallery: 'galleries',
  fitness: 'fitnesses',
  inquiry: 'inquiries',
  anniversary: 'anniversaries',
  couch: 'couches',
  hypothesis: 'hypotheses',
  mess: 'messes',
  physics: 'physics',
  brush: 'brushes',
  jeans: 'jeans',
  presidency: 'presidencies',
  cry: 'cries',
  candy: 'candies',
  integrity: 'integrities',
  cross: 'crosses',
  weakness: 'weaknesses',
  humanity: 'humanities',
  stretch: 'stretches',
  sandwich: 'sandwiches',
  effectiveness: 'effectiveness',
  lens: 'lenses',
  reach: 'reaches',
  wish: 'wishes',
  diagnosis: 'diagnoses',
  ideology: 'ideologies',
  colony: 'colonies',
  wilderness: 'wildernesses',
  uncertainty: 'uncertainties',
  chaos: 'chaos',
  canvas: 'canvases',
  lobby: 'lobbies',
  currency: 'currencies',
  unity: 'unities',
  rush: 'rushes',
  complexity: 'complexities',
  finish: 'finishes',
  Olympics: 'Olympics',
  belly: 'bellies',
  liberty: 'liberties',
  theology: 'theologies',
  primary: 'primaries',
  equity: 'equities',
  doorway: 'doorways',
  happiness: 'happinesses',
  bias: 'biases',
  worry: 'worries',
  entity: 'entities',
  necessity: 'necessities',
  gravity: 'gravities',
  inventory: 'inventories',
  assembly: 'assemblies',
  popularity: 'popularities',
  kiss: 'kisses',
  "switch": 'switches',
  photography: 'photographies',
  ranch: 'ranches',
  credibility: 'credibilities',
  quantity: 'quantities',
  genius: 'geniuses',
  accuracy: 'accuracies',
  loyalty: 'loyalties',
  diabetes: 'diabetes',
  dynamics: 'dynamics',
  dignity: 'dignities',
  buddy: 'buddies',
  flash: 'flashes',
  glory: 'glories',
  liability: 'liabilities',
  productivity: 'productivities',
  bankruptcy: 'bankruptcies',
  bonus: 'bonuses',
  willingness: 'willingnesses',
  jewelry: 'jewelries',
  reliability: 'reliabilities',
  ass: 'asses',
  bush: 'bush',
  documentary: 'documentaris',
  biology: 'biologies',
  conspiracy: 'conspiracies',
  "catch": 'catches',
  casualty: 'casualties',
  ministry: 'ministries',
  subsidy: 'subsidies',
  mathematics: 'mathematics',
  creativity: 'creativities',
  sympathy: 'sympathies',
  christianity: 'christianities',
  flexibility: 'flexibilities',
  diary: 'diaries',
  irony: 'ironies',
  trash: 'trashes',
  custody: 'custodies',
  sensitivity: 'sensitivities',
  density: 'densities',
  curiosity: 'curiosities',
  stimulus: 'stimuli',
  publicity: 'publicitoes',
  validity: 'validities',
  specialty: 'specialties',
  debris: 'debris',
  ash: 'ashes',
  parish: 'parishes',
  slavery: 'slaveries',
  commodity: 'commodities',
  equality: 'equalities',
  cemetery: 'cemeteries',
  rally: 'rallies',
  similarity: 'similarities',
  mortality: 'mortalities',
  harmony: 'harmonies',
  autonomy: 'autonomies',
  chemistry: 'chemistries',
  sexuality: 'sexualities',
  availability: 'availabilities',
  accountability: 'accountabilities',
  spy: 'spies',
  sovereignty: 'sovereignties',
  electronics: 'electronics',
  shorts: 'shorts',
  biography: 'biographies',
  launch: 'launches',
  summary: 'summaries',
  missionary: 'missionaries',
  butterfly: 'butterflies',
  laundry: 'laundries',
  apology: 'apologies',
  hero: 'heroes',
  potato: 'potatoes',
  tomato: 'tomatoes',
  life: 'lives',
  wife: 'lives',
  knife: 'knives',
  wildlife: 'wildlives',
  foot: 'feet',
  tooth: 'teeth',
  man: "men",
  woman: "women",
  chairman: "chairmen",
  human: "humen",
  gentleman: "gentlemen",
  spokesman: "spokesmen",
  freshman: "freshmen",
  businessman: "businessmen",
  fisherman: "fishermen",
  policeman: "policemen",
  mouse: "mice",
  tax: 'taxes',
  box: 'boxes',
  sex: 'sexes',
  index: 'indexes',
  mix: 'mixes',
  complex: 'complexes',
  child: 'children',
  grandchild: 'grandchildren',
  person: 'people',
  sheep: 'sheep',
  shrimp: 'shrimp',
  deer: 'deer',
  aircraft: 'aircraft',
  craft: 'craft',
  economics: 'economics',
  phenomenon: 'phenomena'
};
var pluralize = function pluralize(noun) {
  return pluralExceptions[noun] ? pluralExceptions[noun] : "".concat(noun, "s");
};
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/words/adjectives.js
/* harmony default export */ var adjectives = (['other', 'new', 'good', 'high', 'old', 'great', 'big', 'American', 'small', 'large', 'national', 'young', 'different', 'black', 'long', 'little', 'important', 'political', 'bad', 'white', 'real', 'best', 'right', 'social', 'only', 'public', 'sure', 'low', 'early', 'able', 'human', 'local', 'late', 'hard', 'major', 'better', 'economic', 'strong', 'possible', 'whole', 'free', 'military', 'federal', 'international', 'full', 'special', 'easy', 'clear', 'recent', 'certain', 'personal', 'open', 'red', 'difficult', 'available', 'likely', 'short', 'single', 'medical', 'current', 'wrong', 'private', 'past', 'foreign', 'fine', 'common', 'poor', 'natural', 'significant', 'similar', 'hot', 'dead', 'central', 'happy', 'serious', 'ready', 'simple', 'left', 'physical', 'general', 'environmental', 'financial', 'blue', 'democratic', 'dark', 'various', 'entire', 'close', 'legal', 'religious', 'cold', 'final', 'main', 'green', 'nice', 'huge', 'popular', 'traditional', 'cultural', 'wide', 'particular', 'top', 'far', 'deep', 'individual', 'specific', 'necessary', 'middle', 'beautiful', 'heavy', 'sexual', 'tough', 'commercial', 'total', 'modern', 'positive', 'civil', 'safe', 'interesting', 'rich', 'western', 'senior', 'key', 'professional', 'successful', 'southern', 'fresh', 'global', 'critical', 'concerned', 'effective', 'original', 'basic', 'powerful', 'perfect', 'involved', 'nuclear', 'British', 'African', 'very', 'sorry', 'normal', 'Chinese', 'front', 'supposed', 'Soviet', 'future', 'potential', 'European', 'independent', 'Christian', 'willing', 'previous', 'interested', 'wild', 'average', 'quick', 'light', 'bright', 'tiny', 'additional', 'present', 'warm', 'annual', 'French', 'responsible', 'regular', 'soft', 'female', 'afraid', 'native', 'broad', 'wonderful', 'growing', 'Indian', 'quiet', 'aware', 'complete', 'active', 'chief', 'cool', 'dangerous', 'moral', 'United', 'academic', 'healthy', 'negative', 'following', 'historical', 'direct', 'daily', 'fair', 'famous', 'familiar', 'appropriate', 'eastern', 'primary', 'clean', 'tall', 'male', 'alive', 'extra', 'domestic', 'northern', 'dry', 'Russian', 'sweet', 'corporate', 'strange', 'urban', 'mental', 'educational', 'favorite', 'greatest', 'complex', 'scientific', 'impossible', 'married', 'alone', 'presidential', 'emotional', 'Supreme', 'thin', 'empty', 'regional', 'Iraqi', 'expensive', 'yellow', 'prime', 'like', 'obvious', 'comfortable', 'angry', 'Japanese', 'thick', 'unique', 'internal', 'ethnic', 'actual', 'sick', 'Catholic', 'long-term', 'slow', 'brown', 'standard', 'English', 'funny', 'correct', 'Jewish', 'crazy', 'just', 'ancient', 'golden', 'German', 'used', 'equal', 'official', 'typical', 'conservative', 'smart', 'rare', 'separate', 'mean', 'industrial', 'surprised', 'busy', 'cheap', 'gray', 'overall', 'initial', 'terrible', 'contemporary', 'multiple', 'essential', 'criminal', 'careful', 'upper', 'tired', 'vast', 'limited', 'proud', 'increased', 'enormous', 'liberal', 'massive', 'rural', 'narrow', 'solid', 'useful', 'secret', 'unusual', 'sharp', 'creative', 'outside', 'gay', 'proper', 'live', 'guilty', 'living', 'technical', 'weak', 'illegal', 'fun', 'Israeli', 'spiritual', 'musical', 'dramatic', 'excellent', 'lucky', 'unable', 'sad', 'brief', 'existing', 'remaining', 'visual', 'violent', 'silent', 'later', 'immediate', 'mass', 'leading', 'Arab', 'double', 'Spanish', 'formal', 'joint', 'opposite', 'consistent', 'grand', 'racial', 'Mexican', 'online', 'glad', 'ordinary', 'numerous', 'practical', 'amazing', 'intense', 'visible', 'competitive', 'congressional', 'fundamental', 'severe', 'fat', 'still', 'Asian', 'digital', 'usual', 'psychological', 'increasing', 'holy', 'so-called', 'constant', 'capable', 'nervous', 'crucial', 'electronic', 'pure', 'fellow', 'smooth', 'nearby', 'inner', 'junior', 'due', 'straight', 'pretty', 'permanent', 'wet', 'pink', 'historic', 'apparent', 'sensitive', 'reasonable', 'wooden', 'elementary', 'aggressive', 'false', 'true', 'extreme', 'Latin', 'honest', 'Palestinian', 'giant', 'substantial', 'conventional', 'fast', 'biological', 'flat', 'mad', 'alternative', 'armed', 'clinical', 'Muslim', 'Islamic', 'ultimate', 'valuable', 'minor', 'developing', 'classic', 'extraordinary', 'rough', 'pregnant', 'distant', 'Italian', 'Canadian', 'universal', 'super', 'bottom', 'lost', 'unlikely', 'constitutional', 'broken', 'electric', 'literary', 'stupid', 'strategic', 'remarkable', 'blind', 'genetic', 'chemical', 'accurate', 'Olympic', 'odd', 'tight', 'solar', 'square', 'complicated', 'friendly', 'tremendous', 'innocent', 'remote', 'raw', 'surprising', 'mutual', 'advanced', 'attractive', 'diverse', 'relevant', 'ideal', 'working', 'unknown', 'assistant', 'extensive', 'loose', 'considerable', 'intellectual', 'external', 'confident', 'sudden', 'dirty', 'defensive', 'comprehensive', 'prominent', 'stable', 'elderly', 'steady', 'vital', 'mere', 'exciting', 'radical', 'Irish', 'pale', 'round', 'ill', 'vulnerable', 'scared', 'ongoing', 'athletic', 'slight', 'efficient', 'closer', 'wealthy', 'given', 'incredible', 'rapid', 'painful', 'helpful', 'organic', 'proposed', 'sophisticated', 'asleep', 'controversial', 'desperate', 'loud', 'sufficient', 'modest', 'agricultural', 'curious', 'downtown', 'eager', 'detailed', 'romantic', 'orange', 'temporary', 'relative', 'brilliant', 'absolute', 'offensive', 'terrorist', 'dominant', 'hungry', 'naked', 'legitimate', 'dependent', 'institutional', 'civilian', 'weekly', 'wise', 'gifted', 'firm', 'running', 'distinct', 'artistic', 'impressive', 'ugly', 'worried', 'moderate', 'subsequent', 'continued', 'frequent', 'awful', 'widespread', 'lovely', 'everyday', 'adequate', 'principal', 'concrete', 'African-American', 'changing', 'colonial', 'dear', 'sacred', 'cognitive', 'collective', 'exact', 'okay', 'homeless', 'gentle', 'related', 'fit', 'magic', 'superior', 'acceptable', 'continuous', 'excited', 'bitter', 'bare', 'subtle', 'pleased', 'ethical', 'secondary', 'experimental', 'net', 'evident', 'harsh', 'suburban', 'retail', 'classical', 'estimated', 'patient', 'missing', 'reliable', 'Roman', 'occasional', 'administrative', 'deadly', 'Hispanic', 'monthly', 'Korean', 'mainstream', 'unlike', 'longtime', 'legislative', 'plain', 'strict', 'inevitable', 'unexpected', 'overwhelming', 'written', 'maximum', 'medium', 'outdoor', 'random', 'minimum', 'fiscal', 'uncomfortable', 'welcome', 'continuing', 'chronic', 'peaceful', 'retired', 'grateful', 'virtual', 'indigenous', 'closed', 'weird', 'outer', 'drunk', 'intelligent', 'convinced', 'driving', 'endless', 'mechanical', 'profound', 'genuine', 'horrible', 'behavioral', 'exclusive', 'meaningful', 'technological', 'pleasant', 'frozen', 'theoretical', 'delicate', 'electrical', 'invisible', 'mild', 'identical', 'precise', 'anxious', 'structural', 'residential', 'nonprofit', 'handsome', 'promising', 'conscious', 'evil', 'teenage', 'decent', 'oral', 'generous', 'purple', 'bold', 'reluctant', 'judicial', 'full-time', 'regulatory', 'diplomatic', 'elegant', 'interior', 'casual', 'productive', 'civic', 'steep', 'dynamic', 'scary', 'disappointed', 'precious', 'representative', 'content', 'realistic', 'hidden', 'tender', 'outstanding', 'lonely', 'artificial', 'abstract', 'silly', 'shared', 'revolutionary', 'rear', 'coastal', 'burning', 'verbal', 'tribal', 'ridiculous', 'automatic', 'divine', 'Dutch', 'Greek', 'talented', 'stiff', 'extended', 'toxic', 'alleged', 'mysterious', 'parental', 'protective', 'faint', 'shallow', 'improved', 'bloody', 'associated', 'near', 'optimistic', 'symbolic', 'hostile', 'combined', 'mixed', 'tropical', 'Cuban', 'spectacular', 'sheer', 'prior', 'immune', 'exotic', 'fascinating', 'secure', 'ideological', 'secular', 'intimate', 'neutral', 'flexible', 'progressive', 'terrific', 'functional', 'cooperative', 'tragic', 'underlying', 'sexy', 'costly', 'ambitious', 'influential', 'uncertain', 'statistical', 'metropolitan', 'rolling', 'aesthetic', 'expected', 'royal', 'minimal', 'anonymous', 'instructional', 'fixed', 'experienced', 'upset', 'cute', 'short-term', 'passing', 'known', 'encouraging', 'accessible', 'dried', 'pro', 'well-known', 'surrounding', 'ecological', 'unprecedented', 'preliminary', 'shy', 'disabled', 'gross', 'damn', 'associate', 'innovative', 'vertical', 'instant', 'required', 'colorful', 'organizational', 'nasty', 'emerging', 'fierce', 'rational', 'vocal', 'unfair', 'risky', 'depressed', 'closest', 'supportive', 'informal', 'Persian', 'perceived', 'sole', 'partial', 'added', 'excessive', 'high-tech', 'logical', 'blank', 'dying', 'developmental', 'faster', 'striking', 'embarrassed', 'fucking', 'isolated', 'suspicious', 'eligible', 'demographic', 'intact', 'elaborate', 'comparable', 'awake', 'feminist', 'dumb', 'philosophical', 'municipal', 'neat', 'mobile', 'brutal', 'voluntary', 'valid', 'unhappy', 'coming', 'distinctive', 'calm', 'theological', 'fragile', 'old-fashioned', 'crowded', 'fantastic', 'level', 'liquid', 'suitable', 'cruel', 'loyal', 'rubber', 'favorable', 'veteran', 'integrated', 'blond', 'explicit', 'disturbing', 'magnetic', 'devastating', 'neighboring', 'consecutive', 'republican', 'worldwide', 'brave', 'dense', 'sunny', 'compelling', 'troubled', 'balanced', 'flying', 'sustainable', 'skilled', 'managing', 'marine', 'organized', 'boring', 'fatal', 'inherent', 'selected', 'naval', 'middle-class']);
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/words/index.js



var words_getNoun = function getNoun(ratio) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$plural = _ref.plural,
      plural = _ref$plural === void 0 ? false : _ref$plural;

  var pos = Math.floor(ratio * nouns.length);
  var noun = nouns[pos];
  return plural ? pluralize(noun) : noun;
};
var words_getAdjective = function getAdjective(ratio) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  objectDestructuringEmpty_default()(_ref2);

  var pos = Math.floor(ratio * adjectives.length);
  var adj = adjectives[pos];
  return adj;
};
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/random.js
/* unused harmony export distributions */





var distributions = {
  uniform: function uniform() {
    return function (x) {
      return x;
    };
  },
  power: function power(n) {
    return function (x) {
      if (n >= 0) {
        return Math.pow(x, n);
      } else {
        return 1 - 1 / Math.pow(x, -n);
      }
    };
  },
  // normal: ({ mean = 0.5, variance = 1 } = {}) => x => mean,
  sin: function sin() {
    var phase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return function (x) {
      return (Math.sin(x * Math.PI * 2 * period + phase) + 1) / 2;
    };
  },
  cos: function cos() {
    var phase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return function (x) {
      return (Math.cos(x * Math.PI * 2 * period + phase) + 1) / 2;
    };
  }
};

var random_Random = function Random(seed, context) {
  var _context = context;

  var _seed = seed || Math.random();

  var rng = external_seed_random_(_seed);
  var count = 0;
  var stack = [];

  var next = function next() {
    var dist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (x) {
      return x;
    };
    count += 1;
    return dist(rng());
  }; // solo manipulations


  var fuzzy = function fuzzy(num, range) {
    return num + next() * range * 2 - range;
  }; // list manipulations


  var chooseOne = function chooseOne(items) {
    return items[_int(0, items.length - 1)];
  };

  var choose = function choose(items) {
    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var length = items.length;

    var options = toConsumableArray_default()(Array(length).keys());

    var choices = [];

    for (var i = 0; i < count; i++) {
      choices.push(options.splice(_int(0, options.length - 1), 1)[0]);
    }

    return choices.map(function (choice) {
      return items[choice];
    });
  };

  var shuffle = function shuffle(items) {
    var output = items.map(function (i) {
      return i;
    });
    var currentIndex = items.length;
    var temporaryValue, randomIndex; // While there remain elements to shuffle...

    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(next() * currentIndex);
      currentIndex -= 1; // And swap it with the current element.

      temporaryValue = output[currentIndex];
      output[currentIndex] = output[randomIndex];
      output[randomIndex] = temporaryValue;
    }

    return output;
  }; // primitive type randoms


  var bool = function bool() {
    var chance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
    return next() < chance ? true : false;
  };

  var _int = function _int() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var dist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : distributions.uniform();
    return Math.floor(next(dist) * (max - min + 1)) + min;
  };

  var _float = function _float() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var dist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : distributions.uniform();
    return next(dist) * (max - min) + min;
  }; // color type randoms


  var color = function color() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$h = _ref.h,
        h = _ref$h === void 0 ? {
      min: 0,
      max: 360
    } : _ref$h,
        _ref$s = _ref.s,
        s = _ref$s === void 0 ? {
      min: 0,
      max: 1
    } : _ref$s,
        _ref$v = _ref.v,
        v = _ref$v === void 0 ? {
      min: 0,
      max: 1
    } : _ref$v;

    var found = false;
    var maxIters = 500;
    var candidate;
    var iters = 0;

    while (!found && iters < maxIters) {
      iters += 1;
      candidate = colors(colorLabel());
      var hsv = candidate.value().toHsv();

      if (hsv.h >= h.min && hsv.h <= h.max && hsv.s >= s.min && hsv.s <= s.max && hsv.v >= v.min && hsv.v <= v.max) {
        found = true;
      }
    }

    return candidate;
  };

  var pallete = function pallete() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object(palletes["a" /* default */])(palleteLabel());
  };
  /* Words */


  var noun = function noun() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$plural = _ref2.plural,
        plural = _ref2$plural === void 0 ? 0.5 : _ref2$plural,
        _ref2$double = _ref2["double"],
        _double = _ref2$double === void 0 ? 0.5 : _ref2$double;

    var isDouble = bool(_double);
    var isPlural = bool(plural);
    return "".concat(isDouble ? "".concat(words_getNoun(next()), " ") : '').concat(words_getNoun(next(), {
      plural: isPlural
    }));
  };

  var adjective = function adjective() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return words_getAdjective(next());
  };

  var label = function label() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$plural = _ref3.plural,
        plural = _ref3$plural === void 0 ? 0.5 : _ref3$plural,
        _ref3$double = _ref3["double"],
        _double2 = _ref3$double === void 0 ? 0.5 : _ref3$double,
        _ref3$modifier = _ref3.modifier,
        modifier = _ref3$modifier === void 0 ? 0.5 : _ref3$modifier;

    var hasAdjective = bool(modifier);
    return "".concat(hasAdjective ? "".concat(adjective(), " ") : '').concat(noun({
      plural: plural,
      "double": _double2
    })).toLowerCase();
  };

  var colorLabel = function colorLabel() {
    return label({
      plural: 0.75,
      "double": 0.3,
      modifier: 0.75
    });
  };

  var palleteLabel = function palleteLabel() {
    return label({
      plural: 0.3,
      "double": 0.75,
      modifier: 0.75
    });
  };
  /* Frames */


  var push = function push(_ref4) {
    var seed = _ref4.seed,
        context = _ref4.context;
    var nextSeed = seed === undefined ? next() : seed;
    stack.push({
      count: count,
      rng: rng,
      _context: _context,
      _seed: _seed
    });
    rng = external_seed_random_(nextSeed);
    count = 0;
    _seed = nextSeed;
    _context = context ? context : nextSeed;
  };

  var pop = function pop(seed) {
    if (stack.length > 0) {
      var data = stack.pop();
      rng = data.rng;
      count = data.count;
      _context = data._context;
      _seed = data._seed;
    }
  };

  var getUses = function getUses() {
    return count;
  };

  var getContext = function getContext() {
    return _context;
  };

  var getSeed = function getSeed() {
    return _seed;
  };

  var getRng = function getRng() {
    return rng;
  };

  var describe = function describe() {
    return {
      count: count,
      context: _context,
      seed: _seed
    };
  };

  return {
    next: next,
    getUses: getUses,
    getContext: getContext,
    getSeed: getSeed,
    getRng: getRng,
    describe: describe,
    push: push,
    pop: pop,
    bool: bool,
    "int": _int,
    "float": _float,
    color: color,
    pallete: pallete,
    fuzzy: fuzzy,
    choose: choose,
    chooseOne: chooseOne,
    shuffle: shuffle,
    noun: noun,
    adjective: adjective,
    label: label,
    colorLabel: colorLabel,
    palleteLabel: palleteLabel
  };
};

/* harmony default export */ var random = __webpack_exports__["a"] = (random_Random);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _reach_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _reach_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reach_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _reach_router__WEBPACK_IMPORTED_MODULE_0__["Link"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _reach_router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return grid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return line; });
/* unused harmony export circleSegments */
/* unused harmony export segment */
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);

var grid = function grid(x, y) {
  return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Array(x * y).keys()).map(function (i) {
    return {
      u: i % x / (x - 1),
      v: Math.floor(i / x) / (y - 1)
    };
  });
};
var line = function line(steps) {
  return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Array(steps).keys()).map(function (i) {
    return i / (steps - 1);
  });
};
var circleSegments = function circleSegments(steps) {
  return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(Array(steps).keys()).map(function (i) {
    return {
      u: Math.cos(i / (steps - 1) * 2 * Math.PI),
      v: Math.sin(i / (steps - 1) * 2 * Math.PI)
    };
  });
};
var segment = function segment(_ref) {
  var start = _ref.start,
      end = _ref.end,
      steps = _ref.steps;
  return line(steps).map(function (i) {
    return {
      x: start.x * i + end.x * (1 - i),
      y: start.y * i + end.y * (1 - i)
    };
  });
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(18);

var requireById = function requireById(id) {
  if (!(0, _utils.isWebpack)() && typeof id === 'string') {
    return __webpack_require__(45)("" + id);
  }

  return __webpack_require__('' + id);
};

exports["default"] = requireById;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@thebespokepixel/es-tinycolor");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@reach/router");

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _colors_palletes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);




/* ********************************* *
 * Options and Random Initialization
 * ********************************* */

var defaultOptions = {
  seed: null,
  title: null,
  pallete: null,
  fullscreen: false,
  width: 2560,
  height: 2560,
  blend: null
};
var titleArray = [];
var titleIndex = 0;
var palleteArray = [];
var palleteIndex = 0;

var redraw = function redraw(options, draw, canvas, wrapper) {
  console.log("Options:", options);
  var canvasHeight = options.fullscreen ? canvas.parentElement.scrollHeight : options.height;
  var canvasWidth = options.fullscreen ? canvas.parentElement.scrollWidth : options.width;

  if (options.fullscreen) {
    wrapper.className = 'fullscreen-wrapper';
  } else {
    wrapper.className = 'framed-wrapper';
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  document.title = options.title;
  var context = canvas.getContext('2d');

  if (options.blend) {
    console.log("Applying Composite Operation: ".concat(options.blend));
    context.globalCompositeOperation = options.blend;
  }

  draw({
    context: context,
    rng: Object(_random__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(options.title),
    pallete: Object(_colors_palletes__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(options.pallete),
    meta: {
      title: options.title,
      pallete: options.pallete,
      size: {
        width: canvasWidth,
        height: canvasHeight
      },
      options: options
    },
    canvas: canvas
  });
};

var download = function download() {
  var downloadLink = document.getElementById('downloader');
  var image = canvas.toDataURL('image/png');
  downloadLink.setAttribute('href', image);
  downloadLink.setAttribute('download', "".concat(document.title, ".png"));
  downloadLink.click();
};

/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      _ref$draw = _ref.draw,
      draw = _ref$draw === void 0 ? function () {} : _ref$draw;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    console.log('Sketch says "Hello!"');
    var canvas = document.getElementById('canvas');
    var wrapper = document.getElementById('canvas-wrapper');
    var sketchOptions = Object(lodash__WEBPACK_IMPORTED_MODULE_3__["merge"])(defaultOptions, options);
    var rand = Object(_random__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(sketchOptions.seed);
    sketchOptions.title = sketchOptions.title || rand.label();
    titleArray.push(sketchOptions.title);
    sketchOptions.pallete = sketchOptions.pallete || rand.label();
    palleteArray.push(sketchOptions.pallete);

    var regen = function regen() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$pallete = _ref2.pallete,
          pallete = _ref2$pallete === void 0 ? false : _ref2$pallete;

      if (titleIndex >= titleArray.length) {
        titleArray.push(rand.label());
      }

      sketchOptions.title = titleArray[titleIndex];

      if (palleteIndex >= palleteArray.length) {
        palleteArray.push(rand.label());
      }

      sketchOptions.pallete = palleteArray[palleteIndex];
    }; // {
    //   ...defaultOptions,
    //   // ...options,
    // };


    redraw(sketchOptions, draw, canvas, wrapper);
    document.addEventListener('keydown', function (event) {
      console.log(event.code);

      switch (event.code) {
        case 'KeyR':
          // Redraw sketch
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'KeyP':
          // Change pallete and nothing else
          regen({
            pallete: true
          });
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'KeyO':
          // Change title and nothing else
          titleIndex = titleArray.length;
          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'Space':
          titleIndex = titleArray.length;
          regen({
            pallete: true
          }); // Refresh everything then redraw sketch
          // generate();

          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'ArrowRight':
          titleIndex += 1;

          if (titleIndex > titleArray.length) {
            titleIndex = titleArray.length;
          }

          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'ArrowLeft':
          titleIndex -= 1;

          if (titleIndex <= 0) {
            titleIndex = 0;
          }

          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'ArrowUp':
          palleteIndex += 1;

          if (palleteIndex > palleteArray.length) {
            palleteIndex = palleteArray.length;
          }

          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'ArrowDown':
          palleteIndex -= 1;

          if (palleteIndex <= 0) {
            palleteIndex = 0;
          }

          regen();
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'KeyF':
          // Toggle fullscreen
          sketchOptions.fullscreen = !sketchOptions.fullscreen;
          redraw(sketchOptions, draw, canvas, wrapper);
          break;

        case 'KeyS':
          download();
          break;

        default:
          break;
      }
    });
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "fixed-fullscreen"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "canvas-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
    download: "asdf",
    id: "canvas"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    id: "downloader",
    download: ""
  }));
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


var Pallete = function Pallete(name) {
  var rng = Object(_random__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(name, "pallete(".concat(name, ")"));
  var count = rng["int"](3, 5);
  var colors = [];

  for (var i = 0; i < count; i++) {
    colors.push(rng.color());
  }

  var next = function next() {
    return rng.color();
  };

  var toString = function toString() {
    // TODO: Add an input to specify a different color coding (rgb?) for this output
    return "Pallete:".concat(name, "=[").concat(colors.map(function (color) {
      return color.toString();
    }), "]");
  };

  return {
    name: name,
    colors: colors,
    toString: toString,
    next: next
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Pallete);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Draw = function Draw(context) {
  var circle = function circle(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        radius = _ref.radius,
        _ref$fill = _ref.fill,
        fill = _ref$fill === void 0 ? null : _ref$fill,
        _ref$strokeWidth = _ref.strokeWidth,
        strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
        _ref$stroke = _ref.stroke,
        stroke = _ref$stroke === void 0 ? null : _ref$stroke,
        _ref$start = _ref.start,
        start = _ref$start === void 0 ? 0 : _ref$start,
        _ref$arc = _ref.arc,
        arc = _ref$arc === void 0 ? 1 : _ref$arc;
    context.beginPath();
    context.arc(x, y, radius, start * 2 * Math.PI, start * 2 * Math.PI + arc * 2 * Math.PI, false);

    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }

    if (stroke) {
      context.lineWidth = strokeWidth;
      context.strokeStyle = stroke;
      context.stroke();
    }
  };

  var rect = function rect(_ref2) {
    var _ref2$x = _ref2.x,
        x = _ref2$x === void 0 ? 0 : _ref2$x,
        _ref2$y = _ref2.y,
        y = _ref2$y === void 0 ? 0 : _ref2$y,
        width = _ref2.width,
        height = _ref2.height,
        fill = _ref2.fill,
        stroke = _ref2.stroke,
        _ref2$strokeWidth = _ref2.strokeWidth,
        strokeWidth = _ref2$strokeWidth === void 0 ? 1 : _ref2$strokeWidth,
        _ref2$corners = _ref2.corners,
        corners = _ref2$corners === void 0 ? {} : _ref2$corners,
        round = _ref2.round;
    // rounded corner dims
    var topLeft = corners.topLeft || round || 0;
    var topRight = corners.topRight || round || 0;
    var bottomLeft = corners.bottomLeft || round || 0;
    var bottomRight = corners.bottomRight || round || 0; // Do rounded corners as path

    if (topLeft || topRight || bottomLeft || bottomRight) {
      context.beginPath();
      context.moveTo(x + topLeft, y);
      context.lineTo(x + width - topRight, y);
      context.quadraticCurveTo(x + width, y, x + width, y + topRight);
      context.lineTo(x + width, y + height - bottomRight);
      context.quadraticCurveTo(x + width, y + height, x + width - bottomRight, y + height);
      context.lineTo(x + bottomLeft, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - bottomLeft);
      context.lineTo(x, y + topLeft);
      context.quadraticCurveTo(x, y, x + topLeft, y);
      context.closePath();

      if (fill) {
        context.fillStyle = fill;
        context.fill();
      }

      if (stroke) {
        context.lineWidth = strokeWidth;
        context.strokeStyle = stroke;
        context.stroke();
      }
    } else {
      if (fill) {
        context.fillStyle = fill;
        context.fillRect(x, y, width, height);
      }

      if (stroke) {
        context.lineWidth = strokeWidth;
        context.strokeStyle = stroke;
        context.strokeRect(x, y, width, height);
      }
    }
  };

  var path = function path(_ref3) {
    var _ref3$path = _ref3.path,
        path = _ref3$path === void 0 ? [] : _ref3$path,
        strokeWidth = _ref3.strokeWidth,
        stroke = _ref3.stroke,
        fill = _ref3.fill,
        _ref3$close = _ref3.close,
        close = _ref3$close === void 0 ? false : _ref3$close,
        _ref3$cap = _ref3.cap,
        cap = _ref3$cap === void 0 ? 'round' : _ref3$cap,
        _ref3$join = _ref3.join,
        join = _ref3$join === void 0 ? 'round' : _ref3$join;
    context.beginPath();
    context.lineJoin = join;
    context.lineCap = cap;
    path.forEach(function (_ref4, i) {
      var x = _ref4.x,
          y = _ref4.y;

      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });

    if (close) {
      context.lineTo(path[0].x, path[0].y);
    }

    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }

    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = strokeWidth;
      context.stroke();
    }
  }; // const poly = ({segments, radius, jitter = 0, cap,}) => {
  // }

  /* This method of coloring a line is awful, extremely slow for long lines*/


  var colorPath = function colorPath(_ref5) {
    var _ref5$path = _ref5.path,
        path = _ref5$path === void 0 ? [] : _ref5$path,
        strokeWidth = _ref5.strokeWidth,
        stroke = _ref5.stroke,
        fill = _ref5.fill,
        _ref5$close = _ref5.close,
        close = _ref5$close === void 0 ? false : _ref5$close,
        _ref5$cap = _ref5.cap,
        cap = _ref5$cap === void 0 ? 'round' : _ref5$cap;
    context.lineCap = cap;
    path.forEach(function (_ref6, i) {
      var x = _ref6.x,
          y = _ref6.y,
          stroke = _ref6.stroke,
          strokeWidth = _ref6.strokeWidth;

      if (i >= 1) {
        context.beginPath();
        var start = path[Math.max(0, i - 2)];
        var mid = path[i - 1];
        var end = {
          x: x,
          y: y
        };
        context.moveTo(start.x, start.y);
        context.lineTo(mid.x, mid.y);
        context.lineTo(end.x, end.y);

        if (stroke) {
          context.strokeStyle = stroke;
          context.lineWidth = strokeWidth;
          context.stroke();
        }
      }
    });

    if (close) {
      context.lineTo(path[0].x, path[0].y);
    }

    if (fill) {
      context.fillStyle = fill;
      context.fill();
    } // if (stroke) {
    //   context.strokeStyle = stroke;
    //   context.lineWidth = strokeWidth;
    //   context.stroke();
    // }

  };

  return {
    circle: circle,
    rect: rect,
    path: path,
    colorPath: colorPath
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Draw);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-static"
var external_react_static_ = __webpack_require__(5);

// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/components/Router.js
var Router = __webpack_require__(7);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Dynamic.js

/* harmony default export */ var Dynamic = (function () {
  return external_react_default.a.createElement("div", null, "This is a dynamic page! It will not be statically exported, but is available at runtime");
});
// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/css/app.css
var app = __webpack_require__(61);

// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/css/normalize.css
var normalize = __webpack_require__(62);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/App.js
__webpack_require__(57);


 //




 // Any routes that start with 'dynamic' will be treated as non-static routes

Object(external_react_static_["addPrefetchExcludes"])(['dynamic']);

function App() {
  return external_react_default.a.createElement(external_react_static_["Root"], null, external_react_default.a.createElement("div", {
    className: "content"
  }, external_react_default.a.createElement(external_react_default.a.Suspense, {
    fallback: external_react_default.a.createElement("em", null, "Loading...")
  }, external_react_default.a.createElement(Router["b" /* Router */], null, external_react_default.a.createElement(Dynamic, {
    path: "dynamic"
  }), external_react_default.a.createElement(external_react_static_["Routes"], {
    path: "*"
  })))));
}

/* harmony default export */ var src_App = __webpack_exports__["a"] = (App);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(17);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheProm = exports.loadFromPromiseCache = exports.cacheExport = exports.loadFromCache = exports.callForString = exports.createDefaultRender = exports.createElement = exports.findExport = exports.resolveExport = exports.tryRequire = exports.DefaultError = exports.DefaultLoading = exports.babelInterop = exports.isWebpack = exports.isServer = exports.isTest = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var _react = __webpack_require__(0);

var React = _interopRequireWildcard(_react);

var _requireById = __webpack_require__(9);

var _requireById2 = _interopRequireDefault(_requireById);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

var isTest = exports.isTest = "production" === 'test';
var isServer = exports.isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

var isWebpack = exports.isWebpack = function isWebpack() {
  return typeof __webpack_require__ !== 'undefined';
};

var babelInterop = exports.babelInterop = function babelInterop(mod) {
  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && mod.__esModule ? mod["default"] : mod;
};

var DefaultLoading = exports.DefaultLoading = function DefaultLoading() {
  return React.createElement('div', null, 'Loading...');
};

var DefaultError = exports.DefaultError = function DefaultError(_ref) {
  var error = _ref.error;
  return React.createElement('div', null, 'Error: ', error && error.message);
};

var tryRequire = exports.tryRequire = function tryRequire(id) {
  try {
    return (0, _requireById2["default"])(id);
  } catch (err) {
    // warn if there was an error while requiring the chunk during development
    // this can sometimes lead the server to render the loading component.
    if (false) {}
  }

  return null;
};

var resolveExport = exports.resolveExport = function resolveExport(mod, key, onLoad, chunkName, props, context, modCache) {
  var isSync = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var exp = findExport(mod, key);

  if (onLoad && mod) {
    var _isServer = typeof window === 'undefined';

    var info = {
      isServer: _isServer,
      isSync: isSync
    };
    onLoad(mod, info, props, context);
  }

  if (chunkName && exp) cacheExport(exp, chunkName, props, modCache);
  return exp;
};

var findExport = exports.findExport = function findExport(mod, key) {
  if (typeof key === 'function') {
    return key(mod);
  } else if (key === null) {
    return mod;
  }

  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && key ? mod[key] : babelInterop(mod);
};

var createElement = exports.createElement = function createElement(Component, props) {
  return React.isValidElement(Component) ? React.cloneElement(Component, props) : React.createElement(Component, props);
};

var createDefaultRender = exports.createDefaultRender = function createDefaultRender(Loading, Err) {
  return function (props, mod, isLoading, error) {
    if (isLoading) {
      return createElement(Loading, props);
    } else if (error) {
      return createElement(Err, _extends({}, props, {
        error: error
      }));
    } else if (mod) {
      // primary usage (for async import loading + errors):
      return createElement(mod, props);
    }

    return createElement(Loading, props);
  };
};

var callForString = exports.callForString = function callForString(strFun, props) {
  return typeof strFun === 'function' ? strFun(props) : strFun;
};

var loadFromCache = exports.loadFromCache = function loadFromCache(chunkName, props, modCache) {
  return !isServer && modCache[callForString(chunkName, props)];
};

var cacheExport = exports.cacheExport = function cacheExport(exp, chunkName, props, modCache) {
  return modCache[callForString(chunkName, props)] = exp;
};

var loadFromPromiseCache = exports.loadFromPromiseCache = function loadFromPromiseCache(chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)];
};

var cacheProm = exports.cacheProm = function cacheProm(pr, chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)] = pr;
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("seed-random");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports
 // Plugins

var plugins = [{
  location: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/node_modules/react-static-plugin-source-filesystem",
  plugins: [],
  hooks: {}
}, {
  location: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/node_modules/react-static-plugin-reach-router",
  plugins: [],
  hooks: C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0___default()({})
}, {
  location: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/node_modules/react-static-plugin-sitemap/dist",
  plugins: [],
  hooks: {}
}, {
  location: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative",
  plugins: [],
  hooks: {}
}]; // Export em!

/* harmony default export */ __webpack_exports__["default"] = (plugins);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("C:\\Users\\joneu\\workspace\\joneubank\\generative\\react-static\\generative\\node_modules\\react-static\\lib\\browser");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notFoundTemplate", function() { return notFoundTemplate; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__);
















Object(C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__["setHasBabelPlugin"])();
var universalOptions = {
  loading: function loading() {
    return null;
  },
  error: function error(props) {
    console.error(props.error);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "An error occurred loading this page's template. More information is available in the console.");
  },
  ignoreBabelRename: true
};
var t_0 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404 */).then(__webpack_require__.bind(null, 28))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(28);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404";
  }
}), universalOptions);
t_0.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404.js';
var t_1 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves */).then(__webpack_require__.bind(null, 34))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(34);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves";
  }
}), universalOptions);
t_1.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves.js';
var t_2 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001111341-test.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001111341-test */).then(__webpack_require__.bind(null, 29))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001111341-test.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(29);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001111341-test";
  }
}), universalOptions);
t_2.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001111341-test.js';
var t_3 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/abouts.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/abouts */).then(__webpack_require__.bind(null, 30))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/abouts.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(30);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/abouts";
  }
}), universalOptions);
t_3.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/abouts.js';
var t_4 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/blog.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/blog */).then(__webpack_require__.bind(null, 31))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/blog.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(31);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/blog";
  }
}), universalOptions);
t_4.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/blog.js';
var t_5 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/index.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/index */).then(__webpack_require__.bind(null, 32))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/index.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(32);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/index";
  }
}), universalOptions);
t_5.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/index.js';
var t_6 = C_Users_joneu_workspace_joneubank_generative_react_static_generative_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Post",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Post */).then(__webpack_require__.bind(null, 33))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Post');
  },
  resolve: function resolve() {
    return /*require.resolve*/(33);
  },
  chunkName: function chunkName() {
    return "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Post";
  }
}), universalOptions);
t_6.template = 'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Post'; // Template Map

/* harmony default export */ __webpack_exports__["default"] = ({
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404.js': t_0,
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves.js': t_1,
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001111341-test.js': t_2,
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/abouts.js': t_3,
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/blog.js': t_4,
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/index.js': t_5,
  'C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/containers/Post': t_6
}); // Not Found Template

var notFoundTemplate = "C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/404.js";
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404 - Oh no's! We couldn't find that page :("));
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Sketch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);




var draw = function draw(_ref) {
  var context = _ref.context,
      pallete = _ref.pallete,
      rng = _ref.rng,
      canvas = _ref.canvas;

  var _Draw = Object(_draw__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(context),
      rect = _Draw.rect,
      circle = _Draw.circle;

  context.translate(canvas.width / 2, canvas.height / 2);
  var start = 0;
  circle({
    x: rng["int"](-1000, 1000),
    y: rng["int"](-1000, 1000),
    radius: 700,
    fill: pallete.colors[0].value().toRgbString()
  });
};

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Sketch__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    draw: draw
  });
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "React Static is a progressive static site generator for React."));
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_static__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);

 //


function Blog() {
  var _useRouteData = Object(react_static__WEBPACK_IMPORTED_MODULE_1__["useRouteData"])(),
      posts = _useRouteData.posts;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "It's blog time."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#bottom",
    id: "top"
  }, "Scroll to bottom!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "All Posts:", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, posts.map(function (post) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: post.id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Router__WEBPACK_IMPORTED_MODULE_2__[/* Link */ "a"], {
      to: "/blog/post/".concat(post.id, "/")
    }, post.title));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#top",
    id: "bottom"
  }, "Scroll to top!"));
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var pageData = __webpack_require__(63);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Generative Sketches"), pageData.map(function (yearData) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, yearData.year), yearData.content.map(function (monthData) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, monthData.month), monthData.content.map(function (page) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "/".concat(yearData.year, "/").concat(monthData.month, "/").concat(page)
        }, page), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
      }));
    }));
  }));
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Post; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_static__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);

 //


function Post() {
  var _useRouteData = Object(react_static__WEBPACK_IMPORTED_MODULE_1__["useRouteData"])(),
      post = _useRouteData.post;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Router__WEBPACK_IMPORTED_MODULE_2__[/* Link */ "a"], {
    to: "/blog/"
  }, '<', " Back"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, post.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, post.body));
}

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "@babel/runtime/helpers/toConsumableArray"
var toConsumableArray_ = __webpack_require__(3);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/defineProperty"
var defineProperty_ = __webpack_require__(37);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "tinygradient"
var external_tinygradient_ = __webpack_require__(38);
var external_tinygradient_default = /*#__PURE__*/__webpack_require__.n(external_tinygradient_);

// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(19);

// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/components/Sketch.js
var Sketch = __webpack_require__(12);

// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/draw/index.js
var src_draw = __webpack_require__(14);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/utils/index.js

var repeat = function repeat(count, method) {
  for (var i = 0; i < count; i++) {
    method(i);
  }
};
var utils_array = function array(min, max) {
  return toConsumableArray_default()(Array(max - min).keys()).map(function (i) {
    return i + min;
  });
};
var clamp = function clamp(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? 0 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 1 : _ref$max;

  return Math.max(min, Math.min(max, value));
};
// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/data/index.js
var data = __webpack_require__(8);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/draw/layouts.js



var layouts_Layout = function Layout(context) {
  var grid = function grid(x, y, draw) {
    var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref$fitAll = _ref.fitAll,
        fitAll = _ref$fitAll === void 0 ? true : _ref$fitAll;

    var spots = Object(data["a" /* grid */])(x, y);
    var width = fitAll ? canvas.width / x : canvas.width / (x - 1);
    var height = fitAll ? canvas.height / y : canvas.height / (y - 1);
    var translateWidth = fitAll ? canvas.width - width : canvas.width;
    var translateHeight = fitAll ? canvas.height - height : canvas.height;
    var xFitAdjust = fitAll ? width / 2 : 0;
    var yFitAdjust = fitAll ? height / 2 : 0;
    spots.forEach(function (_ref2) {
      var u = _ref2.u,
          v = _ref2.v;
      context.resetTransform();
      context.translate(translateWidth * u + xFitAdjust, translateHeight * v + yFitAdjust);
      draw(width, height);
    });
  };

  return {
    grid: grid
  };
};

/* harmony default export */ var layouts = (layouts_Layout);
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/draw/symmetry.js


var symmetry_Symmetry = function Symmetry(context) {
  var arc = function arc(draw, sections) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$mirror = _ref.mirror,
        mirror = _ref$mirror === void 0 ? true : _ref$mirror;

    repeat(sections, function (i) {
      var angle = 2 * Math.PI * i / sections;
      context.rotate(angle);
      draw(i);
      context.rotate(-angle);
    });
  };

  return {
    arc: arc
  };
};

/* harmony default export */ var symmetry = (symmetry_Symmetry);
// EXTERNAL MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/random.js + 5 modules
var random = __webpack_require__(6);

// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/data/Vec2.js
var magnitude = function magnitude() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      x = _ref.x,
      y = _ref.y;

  return Math.sqrt(x * x + y * y);
};

var normalize = function normalize() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      x = _ref2.x,
      y = _ref2.y;

  var M = magnitude({
    x: x,
    y: y
  });
  return {
    x: x / M,
    y: y / M
  };
};

var difference = function difference(start, end) {
  return Vec2(end.x - start.x, end.y - start.y);
};

var add = function add(a, b) {
  return Vec2(a.x + b.x, a.y + b.y);
};

var scale = function scale(vector, factor) {
  return Vec2(vector.x * factor, vector.y * factor);
};

var rotate = function rotate(theta, _ref3) {
  var x = _ref3.x,
      y = _ref3.y;
  return Vec2(x * Math.cos(theta) - y * Math.sin(theta), y * Math.cos(theta) + x * Math.sin(theta));
};

var polarToVec2 = function polarToVec2(theta, r) {
  return Vec2(r * Math.cos(theta), r * Math.sin(theta));
};

var Vec2 = function Vec2(x, y) {
  var obj = {
    x: x,
    y: y
  };

  var _magnitude = function _magnitude() {
    return magnitude(obj);
  };

  var _normalize = function _normalize() {
    var normal = normalize(obj);
    return Vec2(normal.x, normal.y);
  };

  var delta = function delta(other) {
    return difference(obj, other);
  };

  var direction = function direction(target) {
    return delta(target).normalize();
  };

  var subtract = function subtract(other) {
    return difference(other, obj);
  };

  var _add = function _add(other) {
    return add(obj, other);
  };

  var _scale = function _scale(factor) {
    return scale(obj, factor);
  };

  var _rotate = function _rotate(theta) {
    return rotate(theta, obj);
  };

  return {
    x: x,
    y: y,
    obj: obj,
    magnitude: _magnitude,
    normalize: _normalize,
    delta: delta,
    direction: direction,
    subtract: subtract,
    add: _add,
    scale: _scale,
    rotate: _rotate
  };
};

/* harmony default export */ var data_Vec2 = (Vec2);
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/data/RandomWave.js


 // This will return an array of ints ranging from min to max (-1 to 1 default)

var RandomWave_RandomWave = function RandomWave() {
  var rng = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(random["a" /* default */])();

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$steps = _ref.steps,
      steps = _ref$steps === void 0 ? 100 : _ref$steps,
      _ref$layers = _ref.layers,
      layers = _ref$layers === void 0 ? 8 : _ref$layers,
      _ref$min = _ref.min,
      min = _ref$min === void 0 ? -1 : _ref$min,
      _ref$max = _ref.max,
      max = _ref$max === void 0 ? 1 : _ref$max,
      _ref$maxFreq = _ref.maxFreq,
      maxFreq = _ref$maxFreq === void 0 ? 5 : _ref$maxFreq;

  var freqs = utils_array(1, layers + 1).map(function (i) {
    return rng.next() * maxFreq;
  });
  var offset = rng["int"](0, steps);
  return utils_array(0, steps).map(function (i) {
    return freqs.reduce(function (pos, freq) {
      return pos + Math.sin((i + offset) * Math.PI * 2 * freq / steps) / layers;
    }, 0);
  });
};

/* harmony default export */ var data_RandomWave = (RandomWave_RandomWave);
// CONCATENATED MODULE: C:/Users/joneu/workspace/joneubank/generative/react-static/generative/src/pages/2020/01/202001092350-additive-waves.js















var _202001092350_additive_waves_draw = function draw(_ref) {
  var context = _ref.context,
      pallete = _ref.pallete,
      rng = _ref.rng,
      canvas = _ref.canvas;

  var _Draw = Object(src_draw["a" /* default */])(context),
      rect = _Draw.rect,
      circle = _Draw.circle,
      path = _Draw.path;

  var layout = layouts(context);
  var sym = symmetry(context); // Uncomment a fill or add a different one to set a background. Default is transparent.
  // const foreground = '#369920';

  var foreground = pallete.colors[0];
  var background = pallete.colors[1];
  var gradient = external_tinygradient_default()(['#f00', '#0f0', '#00f']);
  rect(defineProperty_default()({
    width: canvas.width,
    height: canvas.height,
    // fill: tinycolor('hsv(25,8%,95%)').toRgbString(),
    // fill: background.value().toRgbString(),
    fill: '#eee'
  }, "fill", '#191919')); // Move 0,0 to the canvas center:
  // context.translate(canvas.width / 2, canvas.height / 2);

  var draw = function draw(width, height) {
    // Add draw stuff here, run it at the end of the sketch method or in a repeating layout.
    var steps = 1000;
    var layers = 12;
    var maxHeight = height / 8 / 1;
    var lines = 50;
    var lineColors = gradient.rgb(lines);
    repeat(lines, function (lineIndex) {
      var maxFreq = rng["float"](2, 3); // const baseY =
      //   (canvas.height / lines) * lineIndex + canvas.height / lines / 2;

      var baseY = height / 2;
      var heights = data_RandomWave(rng, {
        steps: steps,
        layers: layers,
        maxFreq: maxFreq
      });
      var positions = Object(data["b" /* line */])(steps);
      var wavePath = [{
        x: width,
        y: height
      }, {
        x: 0,
        y: height
      }].concat(toConsumableArray_default()(positions.map(function (pos, index) {
        return data_Vec2(pos * width, heights[index] * maxHeight + baseY);
      })));
      var fill = lineColors[lineIndex];
      path({
        path: wavePath,
        close: true,
        fill: fill
      });
    });
  };

  draw(canvas.width, canvas.height); // layout.grid(4, 4, draw);
};

/* harmony default export */ var _202001092350_additive_waves = __webpack_exports__["default"] = (function () {
  return external_react_default.a.createElement(Sketch["a" /* default */], {
    options: {
      // title: '',
      // pallete: null,
      // fullscreen: true,
      width: 2048,
      height: 2048,
      blend: 'lighten'
    },
    draw: _202001092350_additive_waves_draw
  });
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _reactStatic = __webpack_require__(5);

var _router = __webpack_require__(11);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _default = function _default(_ref) {
  var _ref$RouterProps = _ref.RouterProps,
      userRouterProps = _ref$RouterProps === void 0 ? {} : _ref$RouterProps;
  return {
    Root: function Root(PreviousRoot) {
      return function (_ref2) {
        var children = _ref2.children,
            rest = _objectWithoutProperties(_ref2, ["children"]);

        var basepath = (0, _reactStatic.useBasepath)();
        var staticInfo = (0, _reactStatic.useStaticInfo)();

        var RouteHandler = function RouteHandler(props) {
          return _react["default"].createElement(PreviousRoot, _extends({}, rest, props), children);
        };

        var renderedChildren = // Place a top-level router inside the root
        // This will give proper context to Link and other reach components
        _react["default"].createElement(_router.Router, _extends({}, basepath ? {
          basepath: basepath
        } : {}, userRouterProps), _react["default"].createElement(RouteHandler, {
          path: "/*"
        })); // If we're in SSR, use a manual server location


        return typeof document === 'undefined' ? _react["default"].createElement(_router.ServerLocation, {
          url: (0, _reactStatic.makePathAbsolute)("".concat(basepath, "/").concat(staticInfo.path))
        }, renderedChildren) : renderedChildren;
      };
    },
    Routes: function Routes(PreviousRoutes) {
      return function (props) {
        return (// Wrap Routes in location
          _react["default"].createElement(_router.Location, null, function (location) {
            return _react["default"].createElement(PreviousRoutes, _extends({
              path: "/*"
            }, props, {
              location: location
            }));
          })
        );
      };
    }
  };
};

exports["default"] = _default;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("tinygradient");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectDestructuringEmpty");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(43);
module.exports = __webpack_require__(49);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
/* eslint-disable import/no-dynamic-require */

var plugins = __webpack_require__(22)["default"];

var _require = __webpack_require__(23),
    registerPlugins = _require.registerPlugins;

registerPlugins(plugins);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept("C:\\Users\\joneu\\workspace\\joneubank\\generative\\react-static\\generative\\artifacts\\react-static-browser-plugins.js", function () {
    registerPlugins(__webpack_require__(22)["default"]);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(16)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
/* eslint-disable import/no-dynamic-require */

var _require = __webpack_require__(23),
    registerTemplates = _require.registerTemplates;

var _require2 = __webpack_require__(24),
    templates = _require2["default"],
    notFoundTemplate = _require2.notFoundTemplate;

registerTemplates(templates, notFoundTemplate);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept("C:\\Users\\joneu\\workspace\\joneubank\\generative\\react-static\\generative\\artifacts\\react-static-templates.js", function () {
    var _require3 = __webpack_require__(24),
        templates = _require3["default"],
        notFoundTemplate = _require3.notFoundTemplate;

    registerTemplates(templates, notFoundTemplate);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(16)(module)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearChunks = exports.flushModuleIds = exports.flushChunkNames = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports["default"] = requireUniversalModule;

var _utils = __webpack_require__(18);

var CHUNK_NAMES = exports.CHUNK_NAMES = new Set();
var MODULE_IDS = exports.MODULE_IDS = new Set();

function requireUniversalModule(universalConfig, options, props, prevProps) {
  var key = options.key,
      _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 15000 : _options$timeout,
      onLoad = options.onLoad,
      onError = options.onError,
      isDynamic = options.isDynamic,
      modCache = options.modCache,
      promCache = options.promCache,
      usesBabelPlugin = options.usesBabelPlugin;
  var config = getConfig(isDynamic, universalConfig, options, props);
  var chunkName = config.chunkName,
      path = config.path,
      resolve = config.resolve,
      load = config.load;
  var asyncOnly = !path && !resolve || typeof chunkName === 'function';

  var requireSync = function requireSync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);

    if (!exp) {
      var mod = void 0;

      if (!(0, _utils.isWebpack)() && path) {
        var modulePath = (0, _utils.callForString)(path, props) || '';
        mod = (0, _utils.tryRequire)(modulePath);
      } else if ((0, _utils.isWebpack)() && resolve) {
        var weakId = (0, _utils.callForString)(resolve, props);

        if (__webpack_require__.m[weakId]) {
          mod = (0, _utils.tryRequire)(weakId);
        }
      }

      if (mod) {
        exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache, true);
      }
    }

    return exp;
  };

  var requireAsync = function requireAsync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);
    if (exp) return Promise.resolve(exp);
    var cachedPromise = (0, _utils.loadFromPromiseCache)(chunkName, props, promCache);
    if (cachedPromise) return cachedPromise;
    var prom = new Promise(function (res, rej) {
      var reject = function reject(error) {
        error = error || new Error('timeout exceeded');
        clearTimeout(timer);

        if (onError) {
          var _isServer = typeof window === 'undefined';

          var info = {
            isServer: _isServer
          };
          onError(error, info);
        }

        rej(error);
      }; // const timer = timeout && setTimeout(reject, timeout)


      var timer = timeout && setTimeout(reject, timeout);

      var resolve = function resolve(mod) {
        clearTimeout(timer);
        var exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache);
        if (exp) return res(exp);
        reject(new Error('export not found'));
      };

      var request = load(props, {
        resolve: resolve,
        reject: reject
      }); // if load doesn't return a promise, it must call resolveImport
      // itself. Most common is the promise implementation below.

      if (!request || typeof request.then !== 'function') return;
      request.then(resolve)["catch"](reject);
    });
    (0, _utils.cacheProm)(prom, chunkName, props, promCache);
    return prom;
  };

  var addModule = function addModule(props) {
    if (_utils.isServer || _utils.isTest) {
      if (chunkName) {
        var name = (0, _utils.callForString)(chunkName, props);

        if (usesBabelPlugin) {
          // if ignoreBabelRename is true, don't apply regex
          var shouldKeepName = options && !!options.ignoreBabelRename;

          if (!shouldKeepName) {
            name = name.replace(/\//g, '-');
          }
        }

        if (name) CHUNK_NAMES.add(name);
        if (!_utils.isTest) return name; // makes tests way smaller to run both kinds
      }

      if ((0, _utils.isWebpack)()) {
        var weakId = (0, _utils.callForString)(resolve, props);
        if (weakId) MODULE_IDS.add(weakId);
        return weakId;
      }

      if (!(0, _utils.isWebpack)()) {
        var modulePath = (0, _utils.callForString)(path, props);
        if (modulePath) MODULE_IDS.add(modulePath);
        return modulePath;
      }
    }
  };

  var shouldUpdate = function shouldUpdate(next, prev) {
    var cacheKey = (0, _utils.callForString)(chunkName, next);
    var config = getConfig(isDynamic, universalConfig, options, prev);
    var prevCacheKey = (0, _utils.callForString)(config.chunkName, prev);
    return cacheKey !== prevCacheKey;
  };

  return {
    requireSync: requireSync,
    requireAsync: requireAsync,
    addModule: addModule,
    shouldUpdate: shouldUpdate,
    asyncOnly: asyncOnly
  };
}

var flushChunkNames = exports.flushChunkNames = function flushChunkNames() {
  var chunks = Array.from(CHUNK_NAMES);
  CHUNK_NAMES.clear();
  return chunks;
};

var flushModuleIds = exports.flushModuleIds = function flushModuleIds() {
  var ids = Array.from(MODULE_IDS);
  MODULE_IDS.clear();
  return ids;
};

var clearChunks = exports.clearChunks = function clearChunks() {
  CHUNK_NAMES.clear();
  MODULE_IDS.clear();
};

var getConfig = function getConfig(isDynamic, universalConfig, options, props) {
  if (isDynamic) {
    var resultingConfig = typeof universalConfig === 'function' ? universalConfig(props) : universalConfig;

    if (options) {
      resultingConfig = _extends({}, resultingConfig, options);
    }

    return resultingConfig;
  }

  var load = typeof universalConfig === 'function' ? universalConfig : // $FlowIssue
  function () {
    return universalConfig;
  };
  return {
    file: 'default',
    id: options.id || 'default',
    chunkName: options.chunkName || 'default',
    resolve: options.resolve || '',
    path: options.path || '',
    load: load,
    ignoreBabelRename: true
  };
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	".": 9,
	"./": 9,
	"./index": 9,
	"./index.js": 9
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 45;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(17);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(25);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ReportChunks = function (_React$Component) {
  _inherits(ReportChunks, _React$Component);

  function ReportChunks() {
    _classCallCheck(this, ReportChunks);

    return _possibleConstructorReturn(this, (ReportChunks.__proto__ || Object.getPrototypeOf(ReportChunks)).apply(this, arguments));
  }

  _createClass(ReportChunks, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        report: this.props.report
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2["default"].Children.only(this.props.children);
    }
  }]);

  return ReportChunks;
}(_react2["default"].Component);

ReportChunks.propTypes = {
  report: _propTypes2["default"].func.isRequired
};
ReportChunks.childContextTypes = {
  report: _propTypes2["default"].func.isRequired
};
exports["default"] = ReportChunks;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("vm");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__handleAfter = exports.__update = undefined;

var _hoistNonReactStatics = __webpack_require__(26);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var __update = exports.__update = function __update(props, state, isInitialized) {
  var isMount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isSync = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var isServer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (!isInitialized) return state;

  if (!state.error) {
    state.error = null;
  }

  return __handleAfter(props, state, isMount, isSync, isServer);
};
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__handleAfter"] }] */


var __handleAfter = exports.__handleAfter = function __handleAfter(props, state, isMount, isSync, isServer) {
  var mod = state.mod,
      error = state.error;

  if (mod && !error) {
    (0, _hoistNonReactStatics2["default"])(_index2["default"], mod, {
      preload: true,
      preloadWeak: true
    });

    if (props.onAfter) {
      var onAfter = props.onAfter;
      var info = {
        isMount: isMount,
        isSync: isSync,
        isServer: isServer
      };
      onAfter(info, mod);
    }
  } else if (error && props.onError) {
    props.onError(error);
  }

  return state;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(50);

var _interopRequireDefault = __webpack_require__(51);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(52));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(53));

var React = _interopRequireWildcard(__webpack_require__(0));

var _useStaticInfo = __webpack_require__(54);
/* eslint-disable import/no-dynamic-require */


var OriginalSuspense = React.Suspense;

function Suspense(_ref) {
  var key = _ref.key,
      children = _ref.children,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["key", "children"]);
  return typeof document !== 'undefined' ? React.createElement(OriginalSuspense, (0, _extends2["default"])({
    key: key
  }, rest), children) : React.createElement(React.Fragment, {
    key: key
  }, children);
} // Override the suspense module to be our own


React.Suspense = Suspense;
React["default"].Suspense = Suspense;

var App = __webpack_require__(55)["default"];

var _default = function _default(staticInfo) {
  return function (props) {
    return React.createElement(_useStaticInfo.staticInfoContext.Provider, {
      value: staticInfo
    }, React.createElement(App, props));
  };
};

exports["default"] = _default;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireWildcard");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("C:\\Users\\joneu\\workspace\\joneubank\\generative\\react-static\\generative\\node_modules\\react-static\\lib\\browser\\hooks\\useStaticInfo");

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);


 // Your top level component

 // Export your top level component as JSX (for static rendering)

/* harmony default export */ __webpack_exports__["default"] = (_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]); // Render your app

if (typeof document !== 'undefined') {
  var target = document.getElementById('root');
  var renderMethod = target.hasChildNodes() ? react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate : react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render;

  var render = function render(Comp) {
    renderMethod(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["AppContainer"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Comp, null)), target);
  }; // Render!


  render(_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]); // Hot Module Replacement

  if (module && module.hot) {
    module.hot.accept('./App', function () {
      render(_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(56)(module)))

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(60);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}

global._babelPolyfill = true;
var DEFINE_PROPERTY = "defineProperty";

function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);
"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("core-js/shim");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime/runtime");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("core-js/fn/regexp/escape");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)(false);
// Module
exports.push([module.i, "* {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nbody {\r\n  font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',\r\n    Helvetica, Arial, 'Lucida Grande', sans-serif;\r\n  font-weight: 300;\r\n  font-size: 16px;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\na {\r\n  text-decoration: none;\r\n  color: #108db8;\r\n  font-weight: bold;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n}\r\n\r\nnav {\r\n  width: 100%;\r\n  background: #108db8;\r\n}\r\n\r\nnav a {\r\n  color: white;\r\n  padding: 1rem;\r\n  display: inline-block;\r\n}\r\n\r\n.content {\r\n  padding: 1rem;\r\n}\r\n\r\nhtml {\r\n  height: 100%;\r\n}\r\n\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n.hidden {\r\n  display: none;\r\n}\r\n\r\n.fixed-fullscreen {\r\n  height: 100%;\r\n  width: 100%;\r\n  position: fixed;\r\n  top: 0px;\r\n  left: 0px;\r\n  background: #e2d1d9;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.fullscreen-wrapper {\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n.framed-wrapper {\r\n  padding: 50px;\r\n}\r\n\r\ncanvas {\r\n  height: 100%;\r\n  width: 100%;\r\n  display: block;\r\n  box-shadow: 0px 0px 34px 4px rgba(0, 0, 0, 0.7);\r\n}\r\n", ""]);



/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(27)(false);
// Module
exports.push([module.i, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/* Document\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the line height in all browsers.\r\n * 2. Prevent adjustments of font size after orientation changes in iOS.\r\n */\r\n\r\nhtml {\r\n  line-height: 1.15; /* 1 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/* Sections\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the margin in all browsers.\r\n */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/**\r\n * Render the `main` element consistently in IE.\r\n */\r\n\r\nmain {\r\n  display: block;\r\n}\r\n\r\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\n/* Grouping content\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\r\n\r\nhr {\r\n  box-sizing: content-box; /* 1 */\r\n  height: 0; /* 1 */\r\n  overflow: visible; /* 2 */\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\npre {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/* Text-level semantics\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the gray background on active links in IE 10.\r\n */\r\n\r\na {\r\n  background-color: transparent;\r\n}\r\n\r\n/**\r\n * 1. Remove the bottom border in Chrome 57-\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\r\n\r\nabbr[title] {\r\n  border-bottom: none; /* 1 */\r\n  text-decoration: underline; /* 2 */\r\n  -webkit-text-decoration: underline dotted;\r\n          text-decoration: underline dotted; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\ncode,\r\nkbd,\r\nsamp {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct font size in all browsers.\r\n */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the border on images inside links in IE 10.\r\n */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/* Forms\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Change the font styles in all browsers.\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  font-family: inherit; /* 1 */\r\n  font-size: 100%; /* 1 */\r\n  line-height: 1.15; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\r\n\r\nbutton,\r\ninput {\r\n  /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\r\n\r\nbutton,\r\nselect {\r\n  /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n * Correct the inability to style clickable types in iOS and Safari.\r\n */\r\n\r\nbutton,\r\n[type='button'],\r\n[type='reset'],\r\n[type='submit'] {\r\n  -webkit-appearance: button;\r\n}\r\n\r\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\n[type='button']::-moz-focus-inner,\r\n[type='reset']::-moz-focus-inner,\r\n[type='submit']::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\r\n\r\nbutton:-moz-focusring,\r\n[type='button']:-moz-focusring,\r\n[type='reset']:-moz-focusring,\r\n[type='submit']:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n * Correct the padding in Firefox.\r\n */\r\n\r\nfieldset {\r\n  padding: 0.35em 0.75em 0.625em;\r\n}\r\n\r\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\r\n\r\nlegend {\r\n  box-sizing: border-box; /* 1 */\r\n  color: inherit; /* 2 */\r\n  display: table; /* 1 */\r\n  max-width: 100%; /* 1 */\r\n  padding: 0; /* 3 */\r\n  white-space: normal; /* 1 */\r\n}\r\n\r\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n * Remove the default vertical scrollbar in IE 10+.\r\n */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in IE 10.\r\n * 2. Remove the padding in IE 10.\r\n */\r\n\r\n[type='checkbox'],\r\n[type='radio'] {\r\n  box-sizing: border-box; /* 1 */\r\n  padding: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\r\n\r\n[type='number']::-webkit-inner-spin-button,\r\n[type='number']::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\r\n\r\n[type='search'] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner padding in Chrome and Safari on macOS.\r\n */\r\n\r\n[type='search']::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n\r\n/* Interactive\r\n   ========================================================================== */\r\n\r\n/*\r\n * Add the correct display in Edge, IE 10+, and Firefox.\r\n */\r\n\r\ndetails {\r\n  display: block;\r\n}\r\n\r\n/*\r\n * Add the correct display in all browsers.\r\n */\r\n\r\nsummary {\r\n  display: list-item;\r\n}\r\n\r\n/* Misc\r\n   ========================================================================== */\r\n\r\n/**\r\n * Add the correct display in IE 10+.\r\n */\r\n\r\ntemplate {\r\n  display: none;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 10.\r\n */\r\n\r\n[hidden] {\r\n  display: none;\r\n}\r\n", ""]);



/***/ }),
/* 63 */
/***/ (function(module) {

module.exports = JSON.parse("[{\"year\":\"2020\",\"content\":[{\"month\":\"01\",\"content\":[\"202001111341-test\",\"202001092350-additive-waves\"]}]}]");

/***/ })
/******/ ]);
});