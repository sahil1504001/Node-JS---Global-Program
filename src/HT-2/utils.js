const errorResponse = (schemaErrors) => {
    console.log(schemaErrors);
    const errors = schemaErrors.map(({ path, message }) => {
        return { path, message };
    });
    return {
        status: 'Failed',
        errors
    };
};

const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            return res.status(400).json(errorResponse(error.details));
        }

        next();
    };
};

module.exports = { validateSchema };
