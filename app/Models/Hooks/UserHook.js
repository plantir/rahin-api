'use strict';
const Video = use('App/Models/Video');
const UserHook = (exports = module.exports = {});
const Hash = use('Hash');
UserHook.beforeCreate = async modelInstance => {
  modelInstance.progress_level = 1;
  modelInstance.personality_tests = [];
  modelInstance.videos = [];
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
      modelInstance = await fix_user_video(modelInstance);
    }
  }
  if (modelInstance.dirty.videos) {
    let step = JSON.parse(modelInstance.videos).find(
      item => item.level == modelInstance.progress_level
    );
    if (!step) {
      return;
    }
    let is_step_completed = check_is_compelete(step);

    if (is_step_completed) {
      modelInstance.progress_level += 1;
      let { label, url } = calculate_next_step(modelInstance.progress_level);
      modelInstance.next_step_label = label;
      modelInstance.next_step_url = url;
      modelInstance = await fix_user_video(modelInstance);
    }
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
      url = '/videos/5';
      break;
    case 6:
      label = 'مشاهده فیلم‌های ادامه مسیر در دانشگاه';
      url = '/videos/6';
      break;
    case 7:
      label = 'مشاهده فیلم‌های از دیدگاه کارشناس';
      url = '/videos/7';
      break;
    case 8:
      label = 'مشاهده فیلم‌های افراد ناراضی و دلایل';
      url = '/videos/8';
      break;
    case 9:
      label = 'مشاهده فیلم‌های افراد موفق و سختی ها';
      url = '/videos/9';
      break;
    case 10:
      label = 'مشاهده فیلم‌های آموزشی سبک زندگی متناسب با رشته';
      url = '/videos/10';
      break;
    case 11:
      label = 'تست عملکرد';
      url = '/competition-test';
      break;
  }
  return { label, url };
}
async function fix_user_video(modelInstance) {
  let video = await Video.findBy({ level: modelInstance.progress_level });
  if (video) {
    let user_videos = JSON.parse(modelInstance.videos);
    let exist_video = user_videos.find(
      item => item.level == modelInstance.progress_level
    );
    if (!exist_video) {
      user_videos.push(video);
      modelInstance.videos = JSON.stringify(user_videos);
    }
    return modelInstance;
  }
}
function check_is_compelete(step) {
  for (const field of step.fields) {
    for (const video of field.videos) {
      if (!video.is_seen) {
        return false;
      }
    }
  }
  return true;
}
