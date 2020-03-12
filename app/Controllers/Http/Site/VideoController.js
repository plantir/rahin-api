'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with videos
 */
const Video = use('App/Models/Video');
class VideoController {
  /**
   * Show a list of all videos.
   * GET videos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return Video.all();
  }

  /**
   * Render a form to update an existing video.
   * GET videos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { level }, auth, request, response, view }) {
    let user = await auth.getUser();
    return user[`video_${level}`];
    return Video.findBy({ level: +level });
  }
}

module.exports = VideoController;
