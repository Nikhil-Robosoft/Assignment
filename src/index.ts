// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";
import admin from "../config/admin";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"],
      afterCreate: async (event) => {
        // create author entry
        const { id, firstname, lastname, email, createdAt, updatedAt } =
          event.result;

        await strapi.service("api::author.author").create({
          data: {
            firstName: firstname,
            lastName: lastname,
            email,
            createdAt,
            updatedAt,
            admin_user: [id],
          },
        });
      },
      afterUpdate: async (event) => {
        const correspondingAuthor = await strapi.entityService.findMany(
          "api::author.author",
          {
            populate: ["admin_user"],
            filters: {
              admin_user: {
                id: event.result.id,
              },
            },
          }
        );
        if (correspondingAuthor) {
          const { firstname, lastname, email, createdAt, updatedAt } =
            event.result;
          await strapi.entityService.update(
            "api::author.author",
            correspondingAuthor[0].id,
            {
              data: {
                firstName: firstname,
                lastName: lastname,
                email,
                createdAt,
                updatedAt,
              },
            }
          );
        }
      },
    });
  },
};
