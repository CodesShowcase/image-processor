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
const src_1 = __importDefault(require("../src"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(src_1.default);
describe('Route Tests', () => {
    test('Route | Root => Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/');
        expect(response.status).toBe(200);
    }));
    test('Route | Get all images => Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/view');
        expect(response.status).toBe(200);
    }));
    test('Route | Retrieve single image => Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/view?file=fjord');
        expect(response.status).toBe(200);
    }));
    test('Route | Retrieve single nonexistent image => Should return status 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/view?file=doesnotexist');
        expect(response.status).toBe(400);
    }));
    test('Route | Resize image => Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/resize?file=fjord&width=400&height=200');
        expect(response.status).toBe(200);
    }));
    test('Route | Greyscale image => Should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/greyscale?file=fjord');
        expect(response.status).toBe(200);
    }));
});
describe('Controller Tests', () => {
    test('Controller | Retrieve a single image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/view?file=fjord`);
        expect(response.files).toBeTrue;
    }));
    test('Controller | Should return resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/resize?file=fjord&width=400&height=200`);
        expect(response.files).toBeTrue;
    }));
    test('Controller | Resize some parameters are missing Parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/resize?width=400&height=200`);
        expect(response.text).toBe('Parameters are missing => /api/resize?file=name&width=pixel&height=pixel');
    }));
    test('Controller | Should return greyscaled image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/api/greyscale?file=fjord`);
        expect(response.files).toBeTrue;
    }));
});
