/**
 * Centralised error types & responder.
 * Keeping FORBIDDEN added here; rest of the file stays untouched.
 */
const errorTypes = {
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
};

const errorResponder = (type, message) => {
  const error = new Error(message);
  error.type = type;
  return error;
};

module.exports = { errorTypes, errorResponder };
