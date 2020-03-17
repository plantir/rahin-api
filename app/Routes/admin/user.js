/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

// Route.resource('users', 'UserController').prefix('admin');
Route.group(() => {
  Route.customResource('', 'UserController');
})
  .prefix('admin/users')
  .namespace('Admin');
