"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.connectDatabase = void 0;
const promise_1 = require("mysql2/promise");
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, promise_1.createConnection)({
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 3306,
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'transactions_db'
    });
    try {
        console.log("Conexión a la base de datos establecida");
        return connection;
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw error;
    }
});
exports.connectDatabase = connectDatabase;
const closeDatabase = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection.end();
        console.log("Conexión a la base de datos cerrada");
    }
    catch (error) {
        console.error("Error al cerrar la conexión a la base de datos:", error);
        throw error;
    }
});
exports.closeDatabase = closeDatabase;
