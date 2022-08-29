
const {SchemaValidationError} = require('../Helpers/error')

const  validateSchema = async (data, schema, updating) =>  {
    try{
        const result = await schema.validateAsync(data, {
            context: { updating: updating ? 'true' : 'false' },
          });
        return result
    }catch(e){
        throw new SchemaValidationError(e)
        
    }
}

module.exports = {validateSchema}