/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('', 'UserController.get');
  Route.put('', 'UserController.update');
})
  .prefix('user')
  .namespace('Site')
  .middleware('auth');
