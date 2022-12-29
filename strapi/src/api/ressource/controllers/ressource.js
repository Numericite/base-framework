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
        ressource: { populate: { theme: true, image: true } },
        files: true,
      },
    });

const childRessourceCreateRequest = (ressource) => {
  console.log("PASSE LA ?");
  switch (ressource.attributes.kind) {
    case "link":
      console.log(
        strapi.service("api::ressource-link.ressource-link").create({
          ressource: ressource.id,
          link: ressource.attributes.link,
        })
      );
      return strapi.service("api::ressource-link.ressource-link").create({
        ressource: ressource.id,
        link: ressource.attributes.link,
      });
    case "file":
      return strapi.service("api::ressource-file.ressource-file").create({
        ressource: ressource.id,
        files: ressource.attributes.files,
      });
    case "video":
      return strapi.service("api::ressource-video.ressource-video").create({
        ressource: ressource.id,
        source: ressource.attributes.source,
        link: ressource.attributes.link,
        autoplay: ressource.attributes.autoplay,
      });
  }
};

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
  async create(ctx) {
    const { data } = await super.create(ctx);
    const childRessourcePromise = childRessourceCreateRequest(data);
    return { data: childRessourceConsolidate(await childRessourcePromise) };
  },
}));
