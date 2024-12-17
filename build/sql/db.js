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
exports.resetDatabase = exports.deleteContact = exports.updateContact = exports.retrieveContactById = exports.retrieveContacts = exports.createContact = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "contactbook",
    password: "password",
    port: 5432,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    let client;
    try {
        client = yield exports.pool.connect();
        yield client.query("SELECT NOW()");
        console.log('PostgreSQL connected successfully!');
    }
    catch (err) {
        console.error('Error connecting to PostgreSQL:', err);
    }
    finally {
        if (client) {
            client.release();
        }
    }
}))();
const createContact = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.pool.query('INSERT INTO contacts (name) VALUES ($1)', [contact.name]);
    return res.rows;
});
exports.createContact = createContact;
const retrieveContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.pool.query('SELECT * FROM contacts');
    return res.rows;
});
exports.retrieveContacts = retrieveContacts;
const retrieveContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.pool.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return res.rows;
});
exports.retrieveContactById = retrieveContactById;
const updateContact = (id, contact) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.pool.query('UPDATE contacts SET name = $1 WHERE id = $2', [contact.name, id]);
    return res.rows;
});
exports.updateContact = updateContact;
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    return res.rows;
});
exports.deleteContact = deleteContact;
const resetDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield exports.pool.connect();
    yield client.query('DROP TABLE IF EXISTS contacts');
    yield client.query('CREATE TABLE contacts (id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL)');
    yield client.query('INSERT INTO contacts (name) VALUES (\'John Doe\')');
    yield client.query('INSERT INTO contacts (name) VALUES (\'Jane Doe\')');
    yield client.query('INSERT INTO contacts (name) VALUES (\'Jim Beam\')');
    client.release();
});
exports.resetDatabase = resetDatabase;
