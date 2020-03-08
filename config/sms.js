module.exports = {
  connection: 'sms_ir',
  sms_ir: {
    url: 'http://ws.sms.ir/api/MessageSend',
    lineNumber: '10009035',
    fast_url: 'https://RestfulSms.com/api/UltraFastSend',
    auth: {
      url: 'http://ws.sms.ir/api/Token',
      UserApiKey: 'b9364c49e6dee5eeea323fde',
      SecretKey: ')l!e(o9@5*p#a&r%d^'
    },
    templates: {
      'sms.verify': 22227
    }
  },
  masgsm: {
    originator: 'mevang',
    encoding: 'utf-8',
    url: 'http://api.v2.masgsm.com.tr/v2',
    key: 'O4vTmAVf98fs68p0qQTNnE3Gdf4mhT9j9fdjk0kn6EcV'
  }
};
