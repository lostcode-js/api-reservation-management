const { createHash } = require('crypto')

exports.requireAuth = async (request, response, next) => {
    try {
        if (!request.user) {
            return response.status(401).json({ message: 'Token inválido' });
        }
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Não autorizado' });
    }
};

exports.sha256 = function sha256(string) {
    return createHash('sha256').update(string).digest('hex')
}

exports.generateRandomString = function randomString(length = 16) {
    return Array.from({ length }).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')
}
