
function error(res, code, err, msg) {
    return res.status(code).json({
        error: err,
        message: msg
    });
}

exports.forbidden = function (res, err, msg) {
    return error(res, 403, err, msg);
}

exports.unauthorized = function (res, err, msg) {
    return error(res, 401, err, msg);
}

exports.internalError = function (res, err, msg) {
    return res.status(500);
}

// 400 - bad request
// 401 - unauthorized
// 403 - forbidden