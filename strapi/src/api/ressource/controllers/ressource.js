"use strict";

/**
 * ressource controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const childRessourceRequest = (ressource) =>
strapi
    .service(
      `api::ressource-${ressource.attributes.kind}.ressource-${ressource.attributes.kind}`
    )
    .find({
      filters: {
        ressource: { id: ressource.id },
      },
      populate: {
        ressource: { populate: { theme: {
          populate: {
            sub_themes: true, personaes: true
          }
        }, image: true } },
        files: true,
      },
    });

const childRessourceConsolidate = (childRessource) => {
  if (childRessource) {
    let { ressource, ...child } = childRessource;
    return { ...child, ...ressource };
  }
};

module.exports = createCoreController("api::ressource.ressource", () => ({
  async findOne(ctx) {
    const response = await super.findOne(ctx);

    const childRessource = await childRessourceRequest(response.data);

    return { data: childRessourceConsolidate(childRessource.results[0]) };
  },
  async find(ctx) {
    return strapi.controller("api::ressource.ressource").customFind(ctx);
  },
  async customFind(ctx) {
    const { data, meta } = await super.find(ctx);

    const childRessourcesPromises = data.map((ressource) =>
      childRessourceRequest(ressource)
    );

    const finalRessources = await Promise.all(childRessourcesPromises).then(
      (childRessources) => {
        return childRessources.map((childRessource) =>
          childRessourceConsolidate(childRessource.results[0])
        );
      }
    );

    return { data: finalRessources, meta };
  },
}));
