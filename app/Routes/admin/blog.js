/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('BaseRoute');

Route.group(() => {
  Route.customResource('', 'BlogController');
})
  .prefix('admin/blogs')
  .namespace('Admin')
  .middleware('auth');
