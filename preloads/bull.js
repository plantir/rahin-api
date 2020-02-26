const Env = use('Env');
const Bull = use('Rocketseat/Bull');
const port = Env.get('BULL_PORT', 9999);
Bull.process()
  // Optionally you can start BullBoard:
  .ui(port); // http://localhost:9999
// You don't need to specify the port, the default number is 9999
