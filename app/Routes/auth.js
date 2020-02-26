/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
Route.post('/auth/register', 'AuthController.register');
Route.post('/auth/login', 'AuthController.login');
