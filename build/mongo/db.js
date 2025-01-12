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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCounter = exports.decrementCounter = exports.incrementCounter = exports.getCounter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contactbook';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
// Counter Schema
const counterSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    value: { type: Number, required: true }
});
const Counter = mongoose_1.default.model('Counter', counterSchema);
// Counter operations
const getCounter = () => __awaiter(void 0, void 0, void 0, function* () {
    const counter = yield Counter.findById('main');
    if (!counter) {
        const newCounter = new Counter({ _id: 'main', value: 0 });
        yield newCounter.save();
        return 0;
    }
    return counter.value;
});
exports.getCounter = getCounter;
const incrementCounter = () => __awaiter(void 0, void 0, void 0, function* () {
    const counter = yield Counter.findByIdAndUpdate('main', { $inc: { value: 1 } }, { new: true, upsert: true });
    return counter.value;
});
exports.incrementCounter = incrementCounter;
const decrementCounter = () => __awaiter(void 0, void 0, void 0, function* () {
    const counter = yield Counter.findByIdAndUpdate('main', { $inc: { value: -1 } }, { new: true, upsert: true });
    return counter.value;
});
exports.decrementCounter = decrementCounter;
const resetCounter = () => __awaiter(void 0, void 0, void 0, function* () {
    const counter = yield Counter.findByIdAndUpdate('main', { value: 0 }, { new: true, upsert: true });
    return counter.value;
});
exports.resetCounter = resetCounter;
exports.default = mongoose_1.default;
