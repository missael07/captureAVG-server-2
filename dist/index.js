"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//Routes Imports
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const games_routes_1 = __importDefault(require("./routes/games.routes"));
const atBatHits_routes_1 = __importDefault(require("./routes/atBatHits.routes"));
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Routes 
server.app.use('/user', user_routes_1.default);
server.app.use('/games', games_routes_1.default);
server.app.use('/hits', atBatHits_routes_1.default);
//Data Base
mongoose_1.default.connect('mongodb+srv://missael:admin1234@cluster0.htccc.mongodb.net/captureAVG?retryWrites=true&w=majority', (err) => {
    if (err)
        throw err;
    console.log('Data Base connected');
});
//start express
server.start(() => {
    console.log(`server running in port ${server.port}`);
});
