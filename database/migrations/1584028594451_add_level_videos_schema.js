'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Video = use('App/Models/Video');
class AddLevelVideosSchema extends Schema {
  up() {
    let fields = [
      {
        name: 'ریاضی',
        videos: [{ name: 'قسمت اول', is_seen: false, src: '/video/video1.mp4' }]
      },
      {
        name: 'تجربی',
        videos: [{ name: 'قسمت اول', is_seen: false, src: '/video/video1.mp4' }]
      },
      {
        name: 'انسانی',
        videos: [{ name: 'قسمت اول', is_seen: false, src: '/video/video1.mp4' }]
      },
      {
        name: 'فنی حرفه‌ای',
        videos: [{ name: 'قسمت اول', is_seen: false, src: '/video/video1.mp4' }]
      }
    ];
    let levels = [
      { level: 5, label: 'شناخت رشته ی مناسب من', fields },
      { level: 6, label: 'ادامه مسیر در دانشگاه ', fields },
      { level: 7, label: 'از دیدگاه کارشناس', fields },
      { level: 8, label: 'افراد ناراضی و دلایل', fields },
      { level: 9, label: 'افراد موفق و سختی ها', fields },
      { level: 10, label: 'سبک زندگی متناسب با رشته', fields }
    ];

    Video.createMany(levels);
  }

  down() {}
}

module.exports = AddLevelVideosSchema;
