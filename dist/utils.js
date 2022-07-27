"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = exports.safe = exports.renderIndex = exports.url = void 0;
const path = __importStar(require("path")); // node.js internal module usefull to get file paths
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints")); //just a function that retrieves all the API routes
const ejs_1 = __importDefault(require("ejs")); //template engine
// We need to know what will be the API host
// in a local computer is always "localhost" 
// but in gitpod if varies depending on the workspace URL
const url = (port) => {
    let publicUrl = `http://localhost:${port}`;
    // Gitpod has internal environment variables https://www.gitpod.io/docs/environment-variables/
    // the Workspace URL is one of them (thank God)
    if (process.env.GITPOD_WORKSPACE_URL) {
        const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
        publicUrl = `https://${port}-${host}`;
    }
    return publicUrl;
};
exports.url = url;
// this function creates the HTML/CSS for the API Index home page
const renderIndex = (_app, url) => __awaiter(void 0, void 0, void 0, function* () {
    // loop all the endpoints that the user has generated
    const routes = (0, express_list_endpoints_1.default)(_app).map((item) => {
        let endpoints = [];
        item.methods.forEach((e) => {
            endpoints.push({ method: e, path: item.path });
        });
        return endpoints;
    }).flat()
        //remove the home page rout because its obvious
        .filter((r) => r.path != "/");
    // data to be sent to the home page
    let data = {
        host: url,
        routes,
        logo: "https://github.com/Greelow-LLC/boiler-express-type/blob/master/docs/assets/logo.png?raw=true",
        starter: "https://start.4geeksacademy.com/starters/express",
    };
    return new Promise((resolve, reject) => {
        // use the EJS template engine to generate the HTML/CSS
        ejs_1.default.renderFile(path.join(__dirname, "../docs/assets/template.ejs"), data, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
});
exports.renderIndex = renderIndex;
//.sort((a,b) => a.method > b.method)
const safe = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fnReturn = yield fn(req, res);
    }
    catch (err) {
        res.status(err.status || 500);
        res.json({ message: err.message || err.msg || err });
        next(err);
    }
});
exports.safe = safe;
class Exception extends Error {
    constructor(msg, status = 400) {
        super();
        this.status = 400;
        this.status = status || 400;
        this.message = msg;
    }
}
exports.Exception = Exception;
