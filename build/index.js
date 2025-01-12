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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db = __importStar(require("./sql/db"));
const mongoDb = __importStar(require("./mongo/db"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// debate removing this
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield db.retrieveContacts();
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/contacts', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield db.retrieveContacts();
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/contacts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield db.retrieveContactById(req.params.id);
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/contacts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContact = yield db.createContact(req.body);
        res.json(newContact);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.put('/contacts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedContact = yield db.updateContact(req.params.id, req.body);
        res.json(updatedContact);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.delete('/contacts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedContact = yield db.deleteContact(req.params.id);
        res.json(deletedContact);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// reset the database
app.post('/reset', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.resetDatabase();
        res.json({ message: 'Database reset successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/counter', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield mongoDb.getCounter();
        res.json({ value });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/counter/increment', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield mongoDb.incrementCounter();
        res.json({ value });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/counter/decrement', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield mongoDb.decrementCounter();
        res.json({ value });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/counter/reset', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield mongoDb.resetCounter();
        res.json({ value });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
