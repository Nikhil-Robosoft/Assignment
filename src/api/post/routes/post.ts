/**
 * post router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::post.post");

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::post.post', {

//   config: {
//     find: {
//       auth: false,
//       policies: ['is-admin'],
//       middlewares: [],
//     },
//     findOne: {},
//     create: {},
//     update: {},
//     delete: {},
//   },
// });
