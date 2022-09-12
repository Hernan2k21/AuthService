# Node js Auth service

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT           | App listening port          | 8085   |
|DB_USERNAME| Mysql database username |root
|DB_PASSWORD|Mysql database password|root
|DB_HOST|Mysql database host| localhost
|DB_PORT|Mysql database port| 3307
|DB_DIALECT| Sequelize dialect config| mysql
|JWT_SECRET| User JWT secret| secret
|JWT_EXPIRES_IN| User JWT lifespan| 5min
|JWT_REFRESH_SECRET| User refresh token secret| secret2
|JWT_REFRESH_EXPIRES_IN|User refresh lifespan| 365d
|REDIS_USERNAME| Redis in memory db username| root
|REDIS_HOST|Redis in memory db host| localhost
|REDIS_PORT|Redis in memory db port|6379


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.16


# Getting started
- Clone the repository
```
git clone  https://github.com/Hernan2k21/AuthService.git
```
- Install dependencies
```
cd AuthService
npm install
```
- Run the project
```
npm run dev
```

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **config**                 | Application configuration file including environment configs |
| **node_modules**         | Contains all  npm dependencies 
| **src/Actions**      | Contains reusable actions 
| **src/Controllers**      | Contains express route controllers    
| **src/Database**      | Contains database resources     
| **src/Enums**      | Contains useful constants                                              
| **src/Helpers**      | Contains Helper functions   
| **src/Middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/Responses**           | Contains http responses |
| **src/Routes**           | Contain all express routes, separated by module/area of application      
| **src/Tests**           | Contains test resources
| **src/Validations**      | Request schema validations and business logic validations               
| index.js         | Entry point to express app                                                               
| package.json             | Contains npm dependencies

