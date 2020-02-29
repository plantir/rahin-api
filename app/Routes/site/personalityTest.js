/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('answer', 'PersonalityTestController.answer');
  Route.get('', 'PersonalityTestController.get');
})
  .prefix('personalityTest')
  .namespace('Site');
