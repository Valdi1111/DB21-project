
function error(res, code, err, msg) {
    return res.status(code).json({
        error: err,
        message: msg
    });
}

exports.error = error;

exports.badRequest = function (res, err, msg) {
    return error(res, 400, err, msg);
}

exports.unauthorized = function (res, err, msg) {
    return error(res, 401, err, msg);
}

exports.forbidden = function (res, err, msg) {
    return error(res, 403, err, msg);
}

exports.notFound = function (res, err, msg) {
    return error(res, 404, err, msg);
}

exports.conflict = function (res, err, msg) {
    return error(res, 409, err, msg);
}

exports.internalError = function (res, msg) {
    console.error(msg);
    return error(res, 500, "internal_error", msg);
}

// 400 - bad request
// 401 - unauthorized
// 403 - forbidden
