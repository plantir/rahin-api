'use strict';
const Video = use('App/Models/Video');
const UserHook = (exports = module.exports = {});
const Hash = use('Hash');
UserHook.beforeCreate = async modelInstance => {
  modelInstance.personality_tests = modelInstance.personality_tests || [];
  modelInstance.progress_level = 1;
  modelInstance.watched_videos = [];
};
UserHook.beforeSave = async modelInstance => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password);
  }
  if (modelInstance.dirty.progress_level) {
    let { label, url } = calculate_next_step(modelInstance.progress_level);
    modelInstance.next_step_label = label;
    modelInstance.next_step_url = url;
    if (modelInstance.progress_level >= 5) {
      let video = await Video.findBy({ level: modelInstance.progress_level });
      if (video) {
        modelInstance[`video_${modelInstance.progress_level}`] = video.toJSON();
      }
    }
  }
  if (modelInstance.dirty[`video_${modelInstance.progress_level}`]) {
    let step = modelInstance.dirty[`video_${modelInstance.progress_level}`];
    let is_step_completed = true;
    for (const field of step.fields) {
      for (const video of field.videos) {
        if (!video.is_seen) {
          is_step_completed = false;
        }
      }
    }
    if (is_step_completed) {
      modelInstance.progress_level += 1;
      let { label, url } = calculate_next_step(modelInstance.progress_level);
      modelInstance.next_step_label = label;
      modelInstance.next_step_url = url;
      let video = await Video.findBy({ level: modelInstance.progress_level });
      if (video) {
        modelInstance[`video_${modelInstance.progress_level}`] = video.toJSON();
      }
    }
    // let video = await Video.findBy({ level: modelInstance.progress_level });
    // let video_count = 0;
    // let watched_count = 0;
    // for (let field of video.fields) {
    //   video_count += field.videos.length;
    // }
    // let video_level = modelInstance.watched_videos.find(
    //   item => item.level == modelInstance.progress_level
    // );
    // for (let field of video_level.fields) {
    //   watched_count += field.videos.length;
    // }
    // if (watched_count == video_count) {
    //   modelInstance.progress_level += 1;
    // }
  }
};
function calculate_next_step(level) {
  let label, url;
  switch (level) {
    case 1:
      label = 'انجام تست استعداد های من';
      url = '/gardner-test';
      break;
    case 2:
      label = 'انجام تست شخصیت من';
      url = '/hexaco-test';
      break;
    case 3:
      label = 'انجام تست علایق من';
      url = '/chinese-test';
      break;
    case 4:
      label = 'انجام تست شغل سازگار با من';
      url = '/competition-test';
      break;
    case 5:
      label = 'مشاهده فیلم‌های شناخت رشته‌ی مناسب من';
      url = '/profile/videos/5';
      break;
    case 6:
      label = 'مشاهده فیلم‌های ادامه مسیر در دانشگاه';
      url = '/profile/videos/6';
      break;
    case 7:
      label = 'مشاهده فیلم‌های از دیدگاه کارشناس';
      url = '/profile/videos/7';
      break;
    case 8:
      label = 'مشاهده فیلم‌های افراد ناراضی و دلایل';
      url = '/profile/videos/8';
      break;
    case 9:
      label = 'مشاهده فیلم‌های افراد موفق و سختی ها';
      url = '/profile/videos/9';
      break;
    case 10:
      label = 'مشاهده فیلم‌های آموزشی سبک زندگی متناسب با رشته';
      url = '/profile/videos/10';
      break;
    case 11:
      label = 'تست عملکرد';
      url = '/competition-test';
      break;
  }
  return { label, url };
}
