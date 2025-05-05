/**
 * post controller
 */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::post.post');

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      try {
        ctx.body = "ok";
      } catch (err) {
        ctx.body = err;
      }
    },

    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
      // some custom logic here

      // first approach
      // // Calling the default core action
      // const { data, meta } = await super.find(ctx);
      // const filteredData = ctx.state.user ? data : data.filter((post)=>!post.premium);
      // return { filteredData, meta };

      // second approach

      //   const isNonPremiumRequest = ctx.query.premium["$eq"] == false;
      //   const isNonPremiumRequest = false;

      console.log("ctx", ctx.state.user);
      // console.log("auth:", ctx.request.header.authorization);
      // const token = ctx.request.header.authorization?.split(" ")[1];
      // if (token) {
      //   console.log(" token present-------");
      //   try {
      //     const decoded =
      //       await strapi.plugins["users-permissions"].services.jwt.verify(
      //         token
      //       );
      //     ctx.state.user = await strapi.entityService.findOne(
      //       "plugin::users-permissions.user",
      //       decoded.id
      //     );
      //     console.log(ctx.state.user); // Should display user data if successful
      //   } catch (err) {
      //     console.error("Token verification failed:", err);
      //   }
      // }
      // console.log("-----end-----");
      // console.log("super.find(ctx)", await super.find(ctx));
      if (ctx.state.user) {
        return await super.find(ctx);
      }

      const { query } = ctx;
      const queryFilter =
        typeof query.filters === "object" && query.filters ? query.filters : {};

      const filteredData = await strapi.service("api::post.post").find({
        ...query,
        filters: {
          ...queryFilter,
          premium: false,
        },
      });

      const sanitizedData = await this.sanitizeOutput(filteredData, ctx);
      return this.transformResponse(sanitizedData);
    },

    // Method 3: Replacing a core action with proper sanitization
    async findOne(ctx) {
      // validateQuery (optional)
      // to throw an error on query params that are invalid or the user does not have access to
      await this.validateQuery(ctx);

      // sanitizeQuery to remove any query params that are invalid or the user does not have access to
      // It is strongly recommended to use sanitizeQuery even if validateQuery is used
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi
        .service("api::post.post")
        .find(sanitizedQueryParams);

      // sanitizeOutput to ensure the user does not receive any data they do not have access to
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },

    async likePost(ctx) {
      console.log("user", ctx.state.user);
      const user = ctx.state.user;
      const postId = ctx.params.id;
      const { query } = ctx;
      const updatedPost = await strapi.service("api::post.post").likePost({
        postId,
        userId: user.id,
        query,
      });
      const sanitizedResults = await this.sanitizeOutput(updatedPost, ctx);
      return this.transformResponse(sanitizedResults);
    },
  })
);
