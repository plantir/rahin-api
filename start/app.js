'use strict';

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const path = require('path');
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/framework/providers/ViewProvider',
  // '@adonisjs/lucid/providers/LucidProvider',
  'lucid-mongo/providers/LucidMongoProvider',
  path.join(__dirname, '..', 'providers', 'BaseModelProvider'),
  // 'vrwebdesign-adonis/BaseModel/providers/BaseModelProvider',
  'vrwebdesign-adonis/BaseRoute/providers/BaseRouteProvider',
  'vrwebdesign-adonis/Helper/providers/HelperProvider',
  'vrwebdesign-adonis/Providers/sms',
  '@rocketseat/adonis-bull/providers/Bull'
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  // '@adonisjs/lucid/providers/MigrationsProvider',
  'lucid-mongo/providers/MigrationsProvider'
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = { providers, aceProviders, aliases, commands };
