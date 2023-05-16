const base = require('../controllers/baseController');

const mockRequest = (body = {}) => ({body});
const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

describe('base.index function', () => {
    test('res.json called { status: true, message: "Hello world!"', done => {
        const req = mockRequest();
        const res = mockResponse();

        base.index(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'hello world!'
        });

        done();
    });
});

describe('base.sum function', () => {
    test('res.json called { status: true, message: "success", data: {x: x, y: y, result: x+y}', done => {
        const req = mockRequest({x: 10, y: 15});
        const res = mockResponse();
        const expectedResult = req.body.x + req.body.y;

        base.sum(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: true,
            message: 'success',
            data: {
                x: req.body.x,
                y: req.body.y,
                result: expectedResult
            }
        });

        done();
    });
});