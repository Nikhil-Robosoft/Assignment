/**
 * post service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely custom service
  async likePost(args) {
    const { postId, userId, query } = args;
    const postToLike = await strapi.entityService.findOne(
      "api::post.post",
      postId,
      {
        populate: ["likedBy"],
      }
    );
    const updatedPost = await strapi.entityService.update(
      "api::post.post",
      postId,
      {
        data: {
          // @ts-ignore
          likedBy: [...postToLike.likedBy, userId],
          publishedAt: new Date(),
        },
        ...query,
      }
    );
    return updatedPost;
  },
}));
