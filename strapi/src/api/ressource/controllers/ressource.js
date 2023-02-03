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
        ressource: {
          populate: {
            theme: true,
            image: true,
            sub_themes: true,
            personaes: true,
            personae_occupations: true,
          },
        },
        files: true,
      },
    });

const childRessourceCreateRequest = async (ressource) => {
  let { id, created_at, updated_at, ...tmpRessource } = ressource;
  return strapi
    .service(`api::ressource-${ressource.kind}.ressource-${ressource.kind}`)
    .create({
      data: {
        ...tmpRessource,
        ressource: id,
      },
    });
};

const childRessourceUpdateRequest = async (ressource, formerKind) => {
  const child = await strapi
    .service(`api::ressource-${formerKind}.ressource-${formerKind}`)
    .find({
      filters: {
        ressource: { id: ressource.id },
      },
      populate: "*",
    });

  if (ressource.kind !== formerKind) {
    const delete_res = await strapi
      .service(`api::ressource-${formerKind}.ressource-${formerKind}`)
      .delete(child.results[0].id);
    if (delete_res.id) {
      const newChildRessource = await childRessourceCreateRequest(ressource);
      if (newChildRessource) {
        return newChildRessource;
      }
    }
  } else {
    let { id, created_at, updated_at, ...tmpRessource } = ressource;
    return strapi
      .service(`api::ressource-${ressource.kind}.ressource-${ressource.kind}`)
      .update(child.results[0].id, {
        data: {
          ...tmpRessource,
          ressource: { id },
        },
      });
  }
};

const childRessourceConsolidate = (childRessource) => {
  if (childRessource) {
    let { ressource, ...child } = childRessource;
    return { ...child, ...ressource, child_id: child.id };
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

    return { data: finalRessources.filter((_) => !!_), meta };
  },
  async create(ctx) {
    let fullRessource = ctx.request.body.data;
    const { data } = await super.create(ctx);
    if (data) {
      fullRessource.id = data.id;
      const childRessourcePromise = await childRessourceCreateRequest(
        fullRessource
      );
      return {
        data: {
          ...childRessourcePromise,
          ...data,
          child_id: childRessourcePromise.id,
        },
      };
    }
  },
  async update(ctx) {
    let fullRessource = ctx.request.body.data;

    const formerRessource = await super.findOne(ctx);
    const formerKind = formerRessource.data.attributes.kind;

    const { data } = await super.update(ctx);
    if (data) {
      const childRessourcePromise = await childRessourceUpdateRequest(
        fullRessource,
        formerKind
      );

      return {
        data: {
          ...childRessourcePromise,
          ...data,
          child_id: childRessourcePromise.id,
        },
      };
    }
  },
}));
