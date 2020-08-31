const express = require('express');
const Ajv = require('ajv');
const schema = require('./movieSchema.json');
const patchSchema = require('./moviePatchSchema.json');

const validate = new Ajv().compile(schema);
const validatePatch = new Ajv().compile(patchSchema);

const movieValidation = new express.Router();

movieValidation.use(express.json());
movieValidation.post('/', createAndUpdateValidator);
movieValidation.put('/:id', createAndUpdateValidator);
movieValidation.patch('/:id', patchValidator);

function createAndUpdateValidator(req, res, next) {
    const valid = validate(req.body);
    if (!valid) {
        const [err] = validate.errors;

        let field = (err.keyword === 'required') ? err.params.missingProperty : err.dataPath;

        return res.status(400).json({
            errorMessage: `Erreur de type '${err.keyword}' sur le champs '${field}' : '${err.message}'`
        });
    }
    next();
}

function patchValidator(req, res, next) {
    const valid = validatePatch(req.body);
    if (!valid) {
        const [err] = validatePatch.errors;

        let field = (err.keyword === 'required') ? err.params.missingProperty : err.dataPath;

        return res.status(400).json({
            errorMessage: `Erreur de type '${err.keyword}' sur le champs '${field}' : '${err.message}'`
        });
    }
    next();
}

module.exports = movieValidation;
