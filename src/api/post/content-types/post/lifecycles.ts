module.exports = {
  async beforeCreate(event) {
    const { params } = event;
    const currentAdminId = params.data.createdBy;

    const correspondingAuthor = await strapi.entityService.findMany(
      "api::author.author",
      {
        populate: ["admin_user"],
        filters: {
          admin_user: currentAdminId,
        },
      }
    );
    console.log("params.data.authors", params.data);
    if (correspondingAuthor) {
      const existingAuthorsFromParam = params.data?.authors?.connect
        ? params.data.authors.connect
        : [];
      console.log("existingAuthorsFromParam", existingAuthorsFromParam);
      params.data.authors = [
        ...existingAuthorsFromParam,
        correspondingAuthor[0].id,
      ];
    }
  },
};
