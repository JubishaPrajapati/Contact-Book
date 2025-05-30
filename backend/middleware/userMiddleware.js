const bcrypt = require('bcrypt');

const userMiddleware = {
    preSave: async function (next) {
        if (!this.isModified('password')) return next();
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
        } catch (error) {
            return next(error);
        }
    },
    comparePassword: async function (candidatePassoword) {
        return await bcrypt.compare(candidatePassoword, this.password);
    }
}

module.exports = userMiddleware;