"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors"); //must always be the first, ideal for error handling
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("./utils/helpers");
const routes_1 = require("./routes");
var PORT = process.env.PORT || '3001';
const PUBLIC_URL = (0, helpers_1.url)(PORT);
const app = (0, express_1.default)();
// create a database connection based on the ./ormconfig.ts file
/*
Middlewares: every time you see "app.use" we are including a new
middleware to the express server, you can read more about middle wares here:
https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/
app.use('/api/v1/stripe/webhook', express_1.default.raw({ type: '*/*' }));
app.use((0, cors_1.default)()); //disable CORS validations
app.use((req, res, next) => {
    if (req.originalUrl === '/api/v1/stripe/webhook') {
        next();
    }
    else {
        express_1.default.json({ limit: '50mb' })(req, res, next);
    }
});
app.use((0, morgan_1.default)('dev')); //logging
// render home website with usefull information for boilerplate developers (students)
app.get('/', (req, res) => (0, helpers_1.renderIndex)(app, PUBLIC_URL).then(html => res.status(404).send(html)));
// import the routes from the ./routes/index.ts file
app.use(routes_1.routerErrors);
app.use(routes_1.routerStripe);
app.use(routes_1.routerPaypal);
// default empty route for 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
exports.default = app;
module.exports = app;
