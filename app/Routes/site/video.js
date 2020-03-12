/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.get('', 'VideoController.index');
  Route.get(':level', 'VideoController.show');
})
  .prefix('videos')
  .namespace('Site')
  .middleware('auth');
