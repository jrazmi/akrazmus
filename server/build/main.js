require('source-map-support/register');
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./db/knex.js":
/*!********************!*\
  !*** ./db/knex.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const environment = "development";

const config = __webpack_require__(/*! ../knexfile.js */ "./knexfile.js")[environment];

module.exports = __webpack_require__(/*! knex */ "knex")(config);

/***/ }),

/***/ "./knexfile.js":
/*!*********************!*\
  !*** ./knexfile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! dotenv */ "dotenv").config();

module.exports = {
  test: {
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    },
    seeds: {
      directory: './db/seeds/test'
    }
  },
  development: {
    debug: false,
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    }
  },
  production: {
    client: "pg",
    connection: process.env.PRODUCTION_DATABASE_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: `./db/migrations`
    }
  }
};

/***/ }),

/***/ "./src/context.js":
/*!************************!*\
  !*** ./src/context.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loaders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loaders */ "./src/loaders/index.js");
/* harmony import */ var _src_util_aws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/util/aws */ "./src/util/aws/index.js");


/* harmony default export */ __webpack_exports__["default"] = (async (req, res, db) => {
  let currentUser; // initialize dataloaders to context

  const loaders = {
    user: {
      id: Object(_loaders__WEBPACK_IMPORTED_MODULE_0__["SingleLoader"])(db, 'users', 'id'),
      email: Object(_loaders__WEBPACK_IMPORTED_MODULE_0__["SingleLoader"])(db, 'users', 'email')
    },
    permissions: {
      global: {
        userId: Object(_loaders__WEBPACK_IMPORTED_MODULE_0__["ManyLoader"])(db, 'global_permissions', 'user_id')
      }
    } // load currentuser into context
    // do we want to actually load user or no?
    // console.log(req)

  };

  if (req && req.user) {
    currentUser = await db('users').where({
      id: req.user.id
    }).first();
  }

  return {
    req,
    res,
    currentUser: currentUser,
    db,
    loaders: loaders,
    sendEmail: _src_util_aws__WEBPACK_IMPORTED_MODULE_1__["sendEmail"]
  };
});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-yoga */ "graphql-yoga");
/* harmony import */ var graphql_yoga__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_yoga__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-jwt */ "express-jwt");
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers */ "./src/resolvers/index.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/types/index.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context */ "./src/context.js");
/* harmony import */ var _middleware_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middleware/auth */ "./src/middleware/auth/index.js");







const db = __webpack_require__(/*! ../db/knex.js */ "./db/knex.js");

__webpack_require__(/*! dotenv */ "dotenv").config();

const server = new graphql_yoga__WEBPACK_IMPORTED_MODULE_0__["GraphQLServer"]({
  typeDefs: _types__WEBPACK_IMPORTED_MODULE_3__["default"],
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_2__["default"],
  context: ({
    request,
    response
  }) => Object(_context__WEBPACK_IMPORTED_MODULE_4__["default"])(request, response, db),
  middlewares: [_middleware_auth__WEBPACK_IMPORTED_MODULE_5__["AuthMiddleware"]]
});
server.express.use(express_jwt__WEBPACK_IMPORTED_MODULE_1___default()({
  secret: process.env.TOKEN_SECRET,
  credentialsRequired: false,
  //allow for auth header or token query param
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

    return null;
  }
}));
const options = {
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
  port: process.env.PORT || 4000,
  cors: {
    credentials: true,
    origin:  false ? undefined : process.env.FRONTEND_HOST
  },
  formatError: err => {
    return {
      message: err.message
    };
  }
};
server.start(options, ({
  port
}) => {
  console.log(`Server started, listening on port ${port} for incoming requests.`);
});

/***/ }),

/***/ "./src/loaders/index.js":
/*!******************************!*\
  !*** ./src/loaders/index.js ***!
  \******************************/
/*! exports provided: SingleLoader, ManyLoader, FilterLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleLoader", function() { return SingleLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManyLoader", function() { return ManyLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterLoader", function() { return FilterLoader; });
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dataloader */ "dataloader");
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dataloader__WEBPACK_IMPORTED_MODULE_0__);

const SingleLoader = (db, table, key) => new dataloader__WEBPACK_IMPORTED_MODULE_0___default.a(keys => {
  return db.table(table).whereIn(key, keys).select().then(rows => {
    return keys.map(ikey => {
      return rows.find(x => x[key] === ikey);
    });
  });
});
const ManyLoader = (db, table, key) => new dataloader__WEBPACK_IMPORTED_MODULE_0___default.a(keys => {
  return db.table(table).whereIn(key, keys).select().then(rows => {
    return keys.map(ikey => {
      return rows.filter(x => x[key] === ikey);
    });
  });
});
const FilterLoader = query => new dataloader__WEBPACK_IMPORTED_MODULE_0___default.a(keys => {
  query.then(rows => {
    return keys.map(id => {
      return rows.filter(x => x.id === id);
    });
  });
});

/***/ }),

/***/ "./src/middleware/auth/index.js":
/*!**************************************!*\
  !*** ./src/middleware/auth/index.js ***!
  \**************************************/
/*! exports provided: AuthMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthMiddleware", function() { return AuthMiddleware; });
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-shield */ "graphql-shield");
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_shield__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/account */ "./src/models/account/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const AuthMiddleware = Object(graphql_shield__WEBPACK_IMPORTED_MODULE_0__["shield"])({
  Query: _objectSpread({}, _models_account__WEBPACK_IMPORTED_MODULE_1__["ShieldQuery"]),
  Mutation: _objectSpread({}, _models_account__WEBPACK_IMPORTED_MODULE_1__["ShieldMutation"])
}, {
  fallbackError: "Not Authorized",
  debug: "development" !== "production",
  allowExternalErrors: true
});

/***/ }),

/***/ "./src/middleware/auth/rules/hasGlobalPerm.js":
/*!****************************************************!*\
  !*** ./src/middleware/auth/rules/hasGlobalPerm.js ***!
  \****************************************************/
/*! exports provided: hasGlobalPerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasGlobalPerm", function() { return hasGlobalPerm; });
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-shield */ "graphql-shield");
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_shield__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


const hasGlobalPerm = perm => Object(graphql_shield__WEBPACK_IMPORTED_MODULE_0__["rule"])({
  cache: "contextual"
})(async (root, args, ctx, info) => {
  if (!ctx.currentUser) return false;
  if (ctx.currentUser.deleted) return false;
  const perms = await ctx.loaders.permissions.global.userId.load(ctx.currentUser.id); // iterate over permissions map permission values to an array
  // return true/false if permission exists

  return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(perms, 'permission'), perm);
});

/***/ }),

/***/ "./src/middleware/auth/rules/index.js":
/*!********************************************!*\
  !*** ./src/middleware/auth/rules/index.js ***!
  \********************************************/
/*! exports provided: isAuthenticated, hasGlobalPerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isAuthenticated__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isAuthenticated */ "./src/middleware/auth/rules/isAuthenticated.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAuthenticated", function() { return _isAuthenticated__WEBPACK_IMPORTED_MODULE_0__["isAuthenticated"]; });

/* harmony import */ var _hasGlobalPerm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hasGlobalPerm */ "./src/middleware/auth/rules/hasGlobalPerm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasGlobalPerm", function() { return _hasGlobalPerm__WEBPACK_IMPORTED_MODULE_1__["hasGlobalPerm"]; });




/***/ }),

/***/ "./src/middleware/auth/rules/isAuthenticated.js":
/*!******************************************************!*\
  !*** ./src/middleware/auth/rules/isAuthenticated.js ***!
  \******************************************************/
/*! exports provided: isAuthenticated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAuthenticated", function() { return isAuthenticated; });
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-shield */ "graphql-shield");
/* harmony import */ var graphql_shield__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_shield__WEBPACK_IMPORTED_MODULE_0__);

const isAuthenticated = Object(graphql_shield__WEBPACK_IMPORTED_MODULE_0__["rule"])({
  cache: "contextual"
})(async (parent, args, ctx) => {
  if (!ctx.currentUser) return false;
  if (ctx.currentUser.deleted) return false;
  return true;
});

/***/ }),

/***/ "./src/models/account/index.js":
/*!*************************************!*\
  !*** ./src/models/account/index.js ***!
  \*************************************/
/*! exports provided: Query, ShieldQuery, Mutation, ShieldMutation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return Query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShieldQuery", function() { return ShieldQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mutation", function() { return Mutation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShieldMutation", function() { return ShieldMutation; });
/* harmony import */ var _resolvers_me__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolvers/me */ "./src/models/account/resolvers/me.js");
/* harmony import */ var _resolvers_requestLogin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers/requestLogin */ "./src/models/account/resolvers/requestLogin.js");
/* harmony import */ var _resolvers_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers/register */ "./src/models/account/resolvers/register.js");
/* harmony import */ var _resolvers_requestPasswordReset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolvers/requestPasswordReset */ "./src/models/account/resolvers/requestPasswordReset.js");
/* harmony import */ var _resolvers_resetPassword__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/resetPassword */ "./src/models/account/resolvers/resetPassword.js");
/* harmony import */ var _resolvers_updateMe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolvers/updateMe */ "./src/models/account/resolvers/updateMe.js");
/* harmony import */ var _middleware_auth_rules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../middleware/auth/rules */ "./src/middleware/auth/rules/index.js");







const Query = {
  me: _resolvers_me__WEBPACK_IMPORTED_MODULE_0__["me"]
};
const ShieldQuery = {
  me: _middleware_auth_rules__WEBPACK_IMPORTED_MODULE_6__["isAuthenticated"]
};
const Mutation = {
  requestLogin: _resolvers_requestLogin__WEBPACK_IMPORTED_MODULE_1__["requestLogin"],
  register: _resolvers_register__WEBPACK_IMPORTED_MODULE_2__["register"],
  requestPasswordReset: _resolvers_requestPasswordReset__WEBPACK_IMPORTED_MODULE_3__["requestPasswordReset"],
  resetPassword: _resolvers_resetPassword__WEBPACK_IMPORTED_MODULE_4__["resetPassword"],
  updateMe: _resolvers_updateMe__WEBPACK_IMPORTED_MODULE_5__["updateMe"]
};
const ShieldMutation = {
  updateMe: _middleware_auth_rules__WEBPACK_IMPORTED_MODULE_6__["isAuthenticated"]
};

/***/ }),

/***/ "./src/models/account/resolvers/me.js":
/*!********************************************!*\
  !*** ./src/models/account/resolvers/me.js ***!
  \********************************************/
/*! exports provided: me */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "me", function() { return me; });
const me = async (root, args, ctx, info) => {
  return ctx.currentUser;
};

/***/ }),

/***/ "./src/models/account/resolvers/register.js":
/*!**************************************************!*\
  !*** ./src/models/account/resolvers/register.js ***!
  \**************************************************/
/*! exports provided: register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);


const register = async (root, args, ctx, info) => {
  // Load user from formatted email
  const formattedEmail = Object(_util__WEBPACK_IMPORTED_MODULE_0__["FormatEmail"])(args.input.email);
  const existing = await ctx.loaders.user.email.load(formattedEmail);

  if (existing) {
    return {
      code: "DUPLICATE",
      success: false,
      message: "Go Log In!",
      nextPage: "/login"
    };
  }

  const userData = Object.assign({}, args.input, {
    password: await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.hash(args.input.password, 10),
    email: formattedEmail
  });
  const user = await ctx.db('users').insert(userData).return('*');
  return {
    code: "OK",
    success: true,
    message: "Go Log In!",
    nextPage: "/login"
  };
};

/***/ }),

/***/ "./src/models/account/resolvers/requestLogin.js":
/*!******************************************************!*\
  !*** ./src/models/account/resolvers/requestLogin.js ***!
  \******************************************************/
/*! exports provided: requestLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestLogin", function() { return requestLogin; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");



const requestLogin = async (root, args, ctx, info) => {
  // Load user from formatted email
  const user = await ctx.loaders.user.email.load(Object(_util__WEBPACK_IMPORTED_MODULE_2__["FormatEmail"])(args.email)); //set Generic Invalid Credential error

  const credAuthError = {
    code: "DOES_NOT_EXIST",
    success: false,
    message: "Could not find matching user with these credentials"
  }; // if no user exists return GIC

  if (!user) {
    return credAuthError;
  } // compare password and return GIC if mismatch


  const valid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default.a.compare(args.password, user.password);

  if (!valid) {
    return credAuthError;
  } //if user has been deleted/suspended return susspension error


  if (user.deleted) {
    return {
      code: "REVOKED",
      success: false,
      message: "Access for this user account has been revoked."
    };
  } // set token for user


  const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.sign({
    id: user.id,
    email: user.email
  }, process.env.TOKEN_SECRET, {
    expiresIn: '30d'
  });
  return {
    code: "OK",
    success: true,
    message: "Login Successful",
    token: token
  };
};

/***/ }),

/***/ "./src/models/account/resolvers/requestPasswordReset.js":
/*!**************************************************************!*\
  !*** ./src/models/account/resolvers/requestPasswordReset.js ***!
  \**************************************************************/
/*! exports provided: requestPasswordReset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestPasswordReset", function() { return requestPasswordReset; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");
/* harmony import */ var _util_templates_EmailRPR__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/templates/EmailRPR */ "./src/util/templates/EmailRPR.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);



const requestPasswordReset = async (root, args, ctx, info) => {
  // Load user from formatted email
  const formattedEmail = Object(_util__WEBPACK_IMPORTED_MODULE_0__["FormatEmail"])(args.email);
  const user = await ctx.loaders.user.email.load(formattedEmail); //set Generic Invalid Credential error

  const credAuthError = {
    code: "DOES_NOT_EXIST",
    success: false,
    message: "Could not find matching user with these credentials"
  }; //if not user return GIC

  if (!user) {
    return credAuthError;
  }

  const resetToken = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
    id: user.id,
    email: user.email
  }, process.env.TOKEN_SECRET, {
    expiresIn: '1h'
  });
  const templateParams = {
    link: `${args.link}?token=${resetToken}`,
    user: user // construct email parameters

  };
  const emailParams = {
    Destination: {
      ToAddresses: [user.email]
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: Object(_util_templates_EmailRPR__WEBPACK_IMPORTED_MODULE_1__["EmailRPR"])("text", templateParams)
        },
        Html: {
          Charset: "UTF-8",
          Data: Object(_util_templates_EmailRPR__WEBPACK_IMPORTED_MODULE_1__["EmailRPR"])("html", templateParams)
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Request Password Reset"
      }
    },
    Source: process.env.FROM_EMAIL // try to send it otherwise you know... error.

  };

  try {
    const send = await ctx.sendEmail(emailParams);
    return {
      code: "OK",
      success: true,
      message: "Check your email for a reset link"
    };
  } catch (e) {
    console.log(e);
    return {
      code: "INPUT_ERROR",
      success: false,
      message: "Email could not be sent"
    };
  }
};

/***/ }),

/***/ "./src/models/account/resolvers/resetPassword.js":
/*!*******************************************************!*\
  !*** ./src/models/account/resolvers/resetPassword.js ***!
  \*******************************************************/
/*! exports provided: resetPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPassword", function() { return resetPassword; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ "bcryptjs");
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);



const resetPassword = async (root, args, ctx, info) => {
  let validJWT; //verify that a valid jwt was passed in

  try {
    validJWT = await jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.verify(args.token, process.env.TOKEN_SECRET);
  } catch (e) {
    return {
      code: "EXPIRED",
      success: false,
      message: "This token is either invalid or expired"
    };
  } // get user from jwt args


  const user = await ctx.loaders.user.email.load(Object(_util__WEBPACK_IMPORTED_MODULE_1__["FormatEmail"])(validJWT.email)); //set Generic Invalid Credential error

  const credAuthError = {
    code: "DOES_NOT_EXIST",
    success: false,
    message: "Could not find matching user with these credentials"
  }; // if no user exists return GIC

  if (!user) {
    return credAuthError;
  } // bcrypt new password


  const updatedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default.a.hash(args.password, 10); //update new password

  const updatedUser = await ctx.db('users').where('id', user.id).update({
    password: updatedPassword
  }).returning('*');
  return {
    code: "OK",
    success: true,
    message: "Password has been updated"
  };
};

/***/ }),

/***/ "./src/models/account/resolvers/updateMe.js":
/*!**************************************************!*\
  !*** ./src/models/account/resolvers/updateMe.js ***!
  \**************************************************/
/*! exports provided: updateMe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMe", function() { return updateMe; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");

const updateMe = async (root, args, ctx, info) => {
  // leaving this in here in case we want to remove user query from context constructor
  // shouldn't be returned if shield isAuthenticated middleware applied
  if (!ctx.currentUser) {
    return {
      code: "EXPIRED",
      success: false,
      message: "No current user"
    };
  }

  const [err, update] = await Object(_util__WEBPACK_IMPORTED_MODULE_0__["prove"])(ctx.db('users').where({
    id: ctx.currentUser.id
  }).update(args.input));

  if (err) {
    return {
      code: "ERROR",
      success: false,
      message: err.message ? err.message : 'Unknown error'
    };
  }

  return {
    code: "OK",
    success: true,
    message: "Profile updated"
  };
};

/***/ }),

/***/ "./src/models/users/index.js":
/*!***********************************!*\
  !*** ./src/models/users/index.js ***!
  \***********************************/
/*! exports provided: Query, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return Query; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var _resolvers_globalPermissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolvers/globalPermissions */ "./src/models/users/resolvers/globalPermissions.js");
/* harmony import */ var _resolvers_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers/user */ "./src/models/users/resolvers/user.js");
/* harmony import */ var _resolvers_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers/users */ "./src/models/users/resolvers/users.js");



const Query = {
  user: _resolvers_user__WEBPACK_IMPORTED_MODULE_1__["user"],
  users: _resolvers_users__WEBPACK_IMPORTED_MODULE_2__["users"]
};
const User = {
  globalPermissions: _resolvers_globalPermissions__WEBPACK_IMPORTED_MODULE_0__["globalPermissions"]
};

/***/ }),

/***/ "./src/models/users/resolvers/globalPermissions.js":
/*!*********************************************************!*\
  !*** ./src/models/users/resolvers/globalPermissions.js ***!
  \*********************************************************/
/*! exports provided: globalPermissions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globalPermissions", function() { return globalPermissions; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

const globalPermissions = async (root, args, ctx, info) => {
  //load all global permissions for root user id
  const perms = await ctx.loaders.permissions.global.userId.load(root.id); // map result to an array of perm values

  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(perms, 'permission');
};

/***/ }),

/***/ "./src/models/users/resolvers/user.js":
/*!********************************************!*\
  !*** ./src/models/users/resolvers/user.js ***!
  \********************************************/
/*! exports provided: user */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");

const user = async (root, args, ctx, info) => {
  let u;

  if (args.id) {
    u = await ctx.loaders.user.id.load(parseInt(args.id));
  } else if (args.email) {
    u = await ctx.loaders.user.email.load(Object(_util__WEBPACK_IMPORTED_MODULE_0__["FormatEmail"])(args.email));
  }

  return u;
};

/***/ }),

/***/ "./src/models/users/resolvers/users.js":
/*!*********************************************!*\
  !*** ./src/models/users/resolvers/users.js ***!
  \*********************************************/
/*! exports provided: users */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "users", function() { return users; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../util */ "./src/util/index.js");

const users = async (root, args, ctx, info) => {
  let query = new _util__WEBPACK_IMPORTED_MODULE_0__["FilterQuery"](ctx.db, 'users', args.input);
  const build = query.build();
  console.log(build.toString());
  const items = await build;
  return {
    hasMore: false,
    totalCount: 0,
    items: items
  };
};

/***/ }),

/***/ "./src/resolvers/index.js":
/*!********************************!*\
  !*** ./src/resolvers/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/account */ "./src/models/account/index.js");
/* harmony import */ var _models_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/users */ "./src/models/users/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = ({
  Query: _objectSpread({}, _models_account__WEBPACK_IMPORTED_MODULE_0__["Query"], {}, _models_users__WEBPACK_IMPORTED_MODULE_1__["Query"]),
  Mutation: _objectSpread({}, _models_account__WEBPACK_IMPORTED_MODULE_0__["Mutation"]),
  User: _models_users__WEBPACK_IMPORTED_MODULE_1__["User"]
});

/***/ }),

/***/ "./src/types/index.js":
/*!****************************!*\
  !*** ./src/types/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! merge-graphql-schemas */ "merge-graphql-schemas");
/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__);


const typesArray = Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__["fileLoader"])(path__WEBPACK_IMPORTED_MODULE_0__["join"](__dirname, "../**/*.graphql"));
const typesMerged = Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__["mergeTypes"])(typesArray);
/* harmony default export */ __webpack_exports__["default"] = (typesMerged);
/* WEBPACK VAR INJECTION */}.call(this, "src/types"))

/***/ }),

/***/ "./src/util/FilterQuery.js":
/*!*********************************!*\
  !*** ./src/util/FilterQuery.js ***!
  \*********************************/
/*! exports provided: FilterQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterQuery", function() { return FilterQuery; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

/* 
Filter construction based on Jake Lowen's
https://github.com/jakelowen/sqorn-graphql-filters/blob/master/lib/applyFilters.js

*/

class FilterQuery {
  constructor(db, table, input) {
    this.build = () => {
      if (this.where) {
        const prepped = this.prep(this.where);
        this.query = this.compose(this.query, prepped);
      }

      const limit = this.limit ? this.limit : 20;
      const offset = this.offset ? this.offset : 0;

      if (this.sort) {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.sort, (order, column) => {
          this.query = this.query.orderBy(column, order.toLowerCase());
        });
      }

      this.query = this.query.limit(limit + 1);
      this.query = this.query.offset(offset);
      return this.query;
    };

    this.prep = (statement, parent = null) => {
      const expressions = [];

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(statement, (x, y) => {
        if (y === "OR") {
          expressions.push({
            class: "PARENT",
            connector: "OR",
            parent: parent,
            operations: this.prep(x, "OR")
          });
        } else if (y === "AND") {
          expressions.push({
            class: "PARENT",
            connector: "AND",
            parent: parent,
            operations: this.prep(x, "AND")
          });
        } else {
          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(x, (v, k) => {
            if (k === "AND" || k === "OR") {
              const subOption = this.prep({
                [k]: v
              }, parent);
              expressions.push(subOption[0]);
            } else {
              lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(v, (x, d) => {
                expressions.push({
                  class: "EXPRESSION",
                  column: k,
                  operation: d,
                  value: x,
                  parent: parent
                });
              });
            }
          });
        }
      });

      return expressions;
    };

    this.compose = (builder, expressions) => {
      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(expressions, statement => {
        switch (statement.class) {
          case "PARENT":
            {
              switch (statement.parent) {
                case "OR":
                  {
                    builder = builder.orWhere(sb => {
                      return this.compose(sb, statement.operations);
                    });
                    break;
                  }

                case "AND":
                  {
                    builder = builder.andWhere(sb => {
                      return this.compose(sb, statement.operations);
                    });
                    break;
                  }

                default:
                  {
                    if (statement.connector === "OR") {
                      builder = builder.orWhere(sb => {
                        return this.compose(sb, statement.operations);
                      });
                      break;
                    } else {
                      builder = builder.andWhere(sb => {
                        return this.compose(sb, statement.operations);
                      });
                      break;
                    }
                  }
              }
            }

          case "EXPRESSION":
            {
              switch (statement.parent) {
                case "OR":
                  {
                    builder = builder.orWhere(sb => {
                      return this.operations(sb, statement);
                    });
                    break;
                  }

                default:
                  {
                    builder = builder.andWhere(sb => {
                      return this.operations(sb, statement);
                    });
                  }
              }
            }
        }
      });

      return builder;
    };

    this.operations = (innerBuilder, statement) => {
      switch (statement.operation) {
        case 'eq':
          {
            return innerBuilder.where(statement.column, '=', statement.value);
          }

        case 'neq':
          {
            return innerBuilder.where(statement.column, '!=', statement.value);
          }

        case 'in':
          {
            return innerBuilder.whereIn(statement.column, statement.value);
          }

        case 'notIn':
          {
            return innerBuilder.whereNotIn(statement.column, statement.value);
          }

        case 'lt':
          {
            return innerBuilder.where(statement.column, '<', statement.value);
          }

        case 'lte':
          {
            return innerBuilder.where(statement.column, '<=', statement.value);
          }

        case 'gt':
          {
            return innerBuilder.where(statement.column, '>', statement.value);
          }

        case 'gte':
          {
            return innerBuilder.where(statement.column, '>=', statement.value);
          }

        case 'contains':
          {
            return innerBuilder.where(statement.column, 'ilike', `%${statement.value}%`);
          }

        case 'notContains':
          {
            return innerBuilder.whereNot(statement.column, 'ilike', `%${statement.value}%`);
          }

        case 'startsWith':
          {
            return innerBuilder.where(statement.column, 'ilike', `${statement.value}%`);
          }

        case 'notStartsWith':
          {
            return innerBuilder.whereNot(statement.column, 'ilike', `${statement.value}%`);
          }

        case 'endsWith':
          {
            return innerBuilder.where(statement.column, 'ilike', `%${statement.value}`);
          }

        case 'notEndsWith':
          {
            return innerBuilder.whereNot(statement.column, 'ilike', `%${statement.value}`);
          }

        default:
          break;
      }
    };

    this.db = db;
    this.query = this.db(table);
    this.where = input && input.where ? input.where : null;
    this.limit = input && input.limit ? input.limit : null;
    this.sort = input && input.sort ? input.sort : null;
    this.offset = input && input.offset ? input.offset : null;
  } // construct the query


}

/***/ }),

/***/ "./src/util/FormatEmail.js":
/*!*********************************!*\
  !*** ./src/util/FormatEmail.js ***!
  \*********************************/
/*! exports provided: FormatEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatEmail", function() { return FormatEmail; });
const FormatEmail = email => {
  return email.trim().toUpperCase();
};

/***/ }),

/***/ "./src/util/Prove.js":
/*!***************************!*\
  !*** ./src/util/Prove.js ***!
  \***************************/
/*! exports provided: prove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prove", function() { return prove; });
const prove = promise => {
  return promise.then(data => [null, data]).catch(err => [err]);
};

/***/ }),

/***/ "./src/util/aws/index.js":
/*!*******************************!*\
  !*** ./src/util/aws/index.js ***!
  \*******************************/
/*! exports provided: sendEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendEmail", function() { return sendEmail; });
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ "aws-sdk");
/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);

aws_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1'
});
const ses = new aws_sdk__WEBPACK_IMPORTED_MODULE_0___default.a.SES({
  apiVersion: '2010-12-01'
}); // init send function for test mocking

const sendEmail = async params => {
  return await ses.sendEmail(params).promise();
};

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: FormatEmail, prove, FilterQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormatEmail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormatEmail */ "./src/util/FormatEmail.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormatEmail", function() { return _FormatEmail__WEBPACK_IMPORTED_MODULE_0__["FormatEmail"]; });

/* harmony import */ var _Prove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Prove */ "./src/util/Prove.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prove", function() { return _Prove__WEBPACK_IMPORTED_MODULE_1__["prove"]; });

/* harmony import */ var _FilterQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilterQuery */ "./src/util/FilterQuery.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterQuery", function() { return _FilterQuery__WEBPACK_IMPORTED_MODULE_2__["FilterQuery"]; });





/***/ }),

/***/ "./src/util/templates/EmailRPR.js":
/*!****************************************!*\
  !*** ./src/util/templates/EmailRPR.js ***!
  \****************************************/
/*! exports provided: EmailRPR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailRPR", function() { return EmailRPR; });
const EmailRPR = (type, content) => {
  if (type === 'text') {
    return `
			${content.user.first_name || "friend"}
			Reset your password: ${content.link}
			`;
  }

  return `<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>Reset Password Request</title>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width">
			<style type="text/css">@media only screen and (max-width:600px){body[yahoo=fix] .wrapper-inner{width:100%!important;margin:0!important;padding:0!important;-webkit-text-size-adjust:none}body[yahoo=fix] img{max-width:100%;height:auto!important}body[yahoo=fix] .content{font-size:15px;padding-top:1em;padding-bottom:1em;margin:0 20px}body[yahoo=fix] .footer{width:100%!important;padding:0!important}body[yahoo=fix] .footer .unsub{width:70%!important}body[yahoo=fix] .footer .social{width:15%!important}body[yahoo=fix] .footer .social a{padding:.5em;display:block}body[yahoo=fix] .footer .social a img{display:block;margin:0 auto}body[yahoo=fix] .footer p{font-size:12px!important;line-height:1.4!important;padding-left:3%}body[yahoo=fix] .spacer{display:none}}@media only screen and (max-width:480px){table[class=footer] p{padding-left:0;text-align:center}table[class=footer] td{display:block!important}table[class=footer] .unsub{width:100%!important}table[class=footer] .gutter{display:none!important}table[class=footer] .social{width:50%!important;float:left;text-align:center}table[class=content] .half-width-button{display:none!important;height:0!important;width:0!important}}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}p{margin:1em 0};
			</style>
		</head>
		<body style="min-width: 100%; margin: 0; padding: 0; font-family: sans-serif; line-height: 1.4; font-size: 15px; background: #ffffff" yahoo="fix">
		<table style="max-width:900px;margin:0px auto" width="95%">
			<tbody>
				<tr>
					<td>
					<div style="max-width: 700px; width: 95%; margin: 0 auto; font-family: sans-serif; font-size: 18px; line-height: 23.8px; color: #2c2b2c;  padding: 7px 7px 7px 7px;">
				
						<p> Hey ${content.user.first_names || "friend"}</p>
						<p> <a href=${content.link}> Reset your password </a></p>
		
					</div>
					</td>
				</tr>
			</tbody>
		</table>
		</body>
		</html>`;
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/elwyn/jrazmi/akrazmus/server/src/index.js */"./src/index.js");


/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),

/***/ "dataloader":
/*!*****************************!*\
  !*** external "dataloader" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dataloader");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "graphql-shield":
/*!*********************************!*\
  !*** external "graphql-shield" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-shield");

/***/ }),

/***/ "graphql-yoga":
/*!*******************************!*\
  !*** external "graphql-yoga" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-yoga");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("knex");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "merge-graphql-schemas":
/*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("merge-graphql-schemas");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=main.map