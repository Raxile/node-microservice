import joi from "joi";

const logSchema = joi.object({
    eventType: joi.string().required().messages({
        "string.base": "Event type must be a string",
        "string.empty": "Event type is required",
        "any.required": "Event type is required",
    }),

    sessionId: joi.string().optional().messages({
        "string.base": "Session ID must be a string",
    }),

    description: joi.string().optional().messages({
        "string.base": "Description must be a string",
    }),

    metadata: joi.object().optional().messages({
        "object.base": "Metadata must be a valid JSON object",
    }),
});

export default logSchema;
