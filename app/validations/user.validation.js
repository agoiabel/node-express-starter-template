const Joi = require('joi');

const rules = {
    store: Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
    }),

	authentication: Joi.object().keys({
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }),
    
}

module.exports = rules;