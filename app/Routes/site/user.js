/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('', 'UserController.get');
  Route.put('', 'UserController.update');
  Route.post('seeVideo', 'UserController.seeVideo');
  Route.get('getTestAnswer/:name', 'UserController.getTestAnswer');
})
  .prefix('user')
  .namespace('Site')
  .middleware('auth');
