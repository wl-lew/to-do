import {
    paginationValidator,
    validateRequireFields
} from "../app/helpers/tasksValidation.js";
import {beforeEach, describe, jest, it, expect} from "@jest/globals";

let mockReq, mockRes;

beforeEach(() => {
    mockReq = {
        body: {}
    };
    mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
});

describe('validateRequireFields', () => {
    it('should return true and call status 400 if title or status are missing', () => {
        mockReq.body = {
            title: 'Test'
        };

        const result = validateRequireFields(mockReq, mockRes);

        expect(result).toBe(true);
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Title and status are required!"
        });
    });

    it('should return false if title and status are present', () => {
        mockReq.body = {
            title: 'Test',
            status: 'pending'
        };

        const result = validateRequireFields(mockReq, mockRes);

        expect(result).toBe(false);
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });
});

describe('paginationValidator', () => {
    it('should return page and limit as numbers when valid query params are provided', () => {
        mockReq.query = {
            page: '2',
            limit: '5'
        };

        const result = paginationValidator(mockReq, mockRes);

        expect(result).toEqual({ page: 2, limit: 5 });
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('should return default values for page and limit if query params are missing', () => {
        const result = paginationValidator(mockReq, mockRes);

        expect(result).toEqual({ page: 1, limit: 10 });
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it('should return a 400 error if page or limit is not a number', () => {
        mockReq.query = {
            page: 'abc',
            limit: '10'
        };

        paginationValidator(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Page and limit must be a number"
        });
    });

    it('should return a 400 error if limit is not a number', () => {
        mockReq.query = {
            page: '1',
            limit: 'xyz'
        };

        paginationValidator(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Page and limit must be a number"
        });
    });
});