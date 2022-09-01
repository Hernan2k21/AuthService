const  expect   = require("chai").expect
const {validateSchema} = require('../../Validations')
const {SchemaValidationError} = require('../../Helpers/error')
const userLoginSchema = require('../../Validations/Schemas/login')
const userDataSchema = require('../../Validations/Schemas/user')



describe("User schema validation: ", function() {
  describe("Check user login schema: ", function() {
    const missingFieldCases = [ 
      {
        data: {
          email:'hernan@genosha.com'
         },
        fields: ['email'],
        required: 'password',
        errorMessage: '"password" is required'
      },
      {
        data: {
          password:'password'
         },
        fields: ['password'],
        required: 'email',
        errorMessage: '"email" is required'
      }

    ]

 missingFieldCases.forEach(function(value) {
      it(`Should fail with field's '${value.fields}'and require '${value.required}' field`, async function() {
        try {
          await validateSchema(value.data, userLoginSchema)
        } catch (e) {
          expect(e.message).to.be.equal(value.errorMessage)
        }
      })
    })

  const wrongDataTypeCases = [
    {
      data: {
        email:'password'
       },
      fields: ['email'],
      type: 'email',
      errorMessage: '"email" must be a valid email'
    },
    {
      data: {
        name: 'hernan',
        email: 'hernan@genosha.com',
        password: "pass"
       },
      fields: ['password'],
      length: ['at least 8'],
      errorMessage: '"password" length must be at least 8 characters long'
    },
    {
      data: {
        name: 'hernan',
        email: 'hernan@genosha.com',
        password: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
       },
      fields: ['password'],
      length: ['less or equal to 32'],
      errorMessage: '"password" length must be less than or equal to 32 characters long'
    },
  ]

  wrongDataTypeCases.forEach(function(value) {
    if(value.type){
      it(`Should require field '${value.fields}' to be '${value.type}' type`, async function() {
        try {
          await validateSchema(value.data, userLoginSchema)
        } catch (e) {
          expect(e.message).to.be.equal(value.errorMessage)
        }
      })
    }else{
      it(`Should require field '${value.fields}' to have a length of '${value.length}'`, async function() {
        try {
          await validateSchema(value.data, userLoginSchema)

        } catch (e) {
          
          expect(e.message).to.be.equal(value.errorMessage)
        }
      })
    }
  
  })
  }); 
  describe("Check user create schema: ", function() {
    const missingFieldCases = [ 
      {
        data: {
          name: 'name',
         },
        fields: ['name'],
        required: 'email',
        errorMessage: '"email" is required'
      },
      {
        data: {
          name: 'hernan',
          email:'hernan@genosha.com'
         },
        fields: ['name, email'],
        required: 'password',
        errorMessage: '"password" is required'
      },
      {
        data: {
          name: 'hernan',
          email: 'hernan@genosha.com',
          password:'password'
         },
        fields: ['name','email','password'],
      }

    ]

 missingFieldCases.forEach(function(value) {
      if(value.required){
        it(`Should fail with field's '${value.fields}' and require '${value.required}' field`, async function() {
          try {
            await validateSchema(value.data, userDataSchema)
          
          } catch (e) {
            expect(e.message).to.be.equal(value.errorMessage)
          }
        })
      }else{
        it(`Should pass with field's '${value.fields}' and return data`, async function() {
          try {
            const data = await validateSchema(value.data, userDataSchema)
            expect(data).to.deep.equal(value.data)
          
          } catch (e) {
            expect(e).to.be.equal(null)
          }
        })
      }
      
    })

  const wrongDataTypeCases = [
    {
      data: {
        name: 123
       },
      fields: ['name'],
      type: 'String',
      errorMessage: '"name" must be a string'
    },
    {
      data: {
        name: 'he'
       },
      fields: ['name'],
      length: ['at least 3'],
      errorMessage: '"name" length must be at least 3 characters long'
    },
    {
      data: {
        name: 'hernanhernanhernanhernan'
       },
      fields: ['name'],
      length: ['less or equal to 15'],
      errorMessage: '"name" length must be less than or equal to 15 characters long'
    },
    {
      data: {
        name: 'hernan',
        email: 123
       },
      fields: ['email'],
      type: 'string',
      errorMessage: '"email" must be a string'
    },
    {
      data: {
        name: 'hernan',
        email: 'notAEmail'
       },
      fields: ['email'],
      type: 'email',
      errorMessage: '"email" must be a valid email'
    },
    {
      data: {
        name: 'hernan',
        email: 'hernan@genosha.com',
        password: 123
       },
      fields: ['password'],
      type: 'string',
      errorMessage: '"password" must be a string'
    },
    {
      data: {
        name: 'hernan',
        email: 'hernan@genosha.com',
        password: "pass"
       },
      fields: ['password'],
      length: ['at least 8'],
      errorMessage: '"password" length must be at least 8 characters long'
    },
    {
      data: {
        name: 'hernan',
        email: 'hernan@genosha.com',
        password: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpasswordpassword"
       },
      fields: ['password'],
      length: ['less or equal to 32'],
      errorMessage: '"password" length must be less than or equal to 32 characters long'
    },
  ]

  wrongDataTypeCases.forEach(function(value) {
    if(value.type){
      it(`Should require field '${value.fields}' to be '${value.type}' type`, async function() {
        try {
          await validateSchema(value.data, userDataSchema)
        } catch (e) {
          expect(e.message).to.be.equal(value.errorMessage)
        }
      })
    }else{
      it(`Should require field '${value.fields}' to have a length of '${value.length}'`, async function() {
        try {
          await validateSchema(value.data, userDataSchema)

        } catch (e) {
          
          expect(e.message).to.be.equal(value.errorMessage)
        }
      })
    }
  
  })
  }); 
 });