const [  SCHEMA_VALIDATION_ERROR, CLIENT_ERROR] = [
    'SCHEMA_VALIDATION_ERROR',
    'CLIENT_ERROR'
  ];
  
  class BaseError extends Error {
    constructor() {
      super();
  
      if (Error.hasOwnProperty('captureStackTrace')) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        Object.defineProperty(this, 'stack', {
          value: new Error().stack,
        });
      }
    }
  }
  
  class SchemaValidationError extends BaseError {
    constructor(params = {}) {
      super(params);
        
      this.name =  SCHEMA_VALIDATION_ERROR;
      this.httpCode = 400;

      this.message= params.details[0].message;
  
      this.path = params.details[0].path;
    }
  }
  class ClientError extends BaseError {
    constructor(params = {}) {
      super(params);
        
      this.name =  CLIENT_ERROR;
      this.httpCode = params.httpCode || 400;
      this.message= params.message;
    }
  }
  module.exports = {
    SchemaValidationError,
   ClientError,
    Constants: [SCHEMA_VALIDATION_ERROR, CLIENT_ERROR],
  };