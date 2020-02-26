/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.put('', 'UserController.update');
})
  .prefix('users')
  .namespace('Site')
  .middleware('auth');
