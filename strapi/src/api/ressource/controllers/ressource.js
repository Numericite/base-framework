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
            contribution: true,
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

const baseRessourcesToResponse = async (data, meta) => {
  const childRessourcesPromises = data.map((ressource) =>
    childRessourceRequest(ressource)
  );

  const finalRessources = await Promise.all(childRessourcesPromises).then(
    (childRessources) => {
      return childRessources.map((childRessource) => {
        const r = data.find(
          (d) => d.id === childRessource.results[0].ressource.id
        );
        return {
          ...childRessourceConsolidate(childRessource.results[0]),
          score: r.score,
        };
      });
    }
  );

  return {
    data: finalRessources.filter((_) => !!_),
    meta,
  };
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

    return baseRessourcesToResponse(data, meta);
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
  async updateStatus(ctx) {
    const { id, status } = ctx.request.body;
    const response = await strapi
      .service("api::ressource.ressource")
      .update(id, { data: { status: status } });
    let fullRessource = await strapi
      .controller("api::ressource.ressource")
      .findOne({ params: { id: response.id } });
    return { data: fullRessource.data };
  },
  async akinator(ctx) {
    const { personae, occupation, subTheme, theme, pagination } =
      ctx.request.query;

    const { rows } = await strapi.db.connection.raw(
      `SELECT t0.id, t0.name, t0.score FROM ( SELECT t1.id, t1.status, t1.name, coalesce(personae_score, 0) + coalesce(personae_occupation_score, 0) + coalesce(sub_theme_score, 0) + coalesce(theme_score, 0) as score FROM ressources t1 LEFT JOIN ( SELECT t2.ressource_id, SUM( CASE WHEN personae_id = ${personae} THEN 10 ELSE 0 END ) as personae_score FROM ressources_personaes_links t2 GROUP BY t2.ressource_id ) t2 ON t1.id = t2.ressource_id LEFT JOIN ( SELECT t3.ressource_id, SUM( CASE WHEN personae_occupation_id = ${occupation} THEN 5 ELSE 0 END ) as personae_occupation_score FROM ressources_personae_occupations_links t3 GROUP BY t3.ressource_id ) t3 ON t1.id = t3.ressource_id LEFT JOIN ( SELECT t4.ressource_id, SUM( CASE WHEN sub_theme_id = ${subTheme} THEN 1 ELSE 0 END ) as sub_theme_score FROM ressources_sub_themes_links t4 GROUP BY t4.ressource_id ) t4 ON t1.id = t4.ressource_id LEFT JOIN ( SELECT t5.ressource_id, SUM( CASE WHEN theme_id = ${theme} THEN 1 ELSE 0 END ) as theme_score FROM ressources_theme_links t5 GROUP BY t5.ressource_id ) t5 ON t1.id = t5.ressource_id ) t0 WHERE status = 'published' ORDER BY score DESC LIMIT ${
        pagination.pageSize
      } OFFSET ${(pagination.page - 1) * pagination.pageSize};`
    );

    const consultation_ids = rows.map((_) => _.id);

    const response = await strapi.service("api::ressource.ressource").find({
      filters: {
        id: { $in: consultation_ids },
      },
    });

    return baseRessourcesToResponse(
      response.results
        .map((_) => {
          const { id, ...attributes } = _;

          return {
            id,
            attributes,
            score: parseInt(rows.find((r) => r.id === _.id)?.score),
          };
        })
        .sort((a, b) => b.score - a.score),
      {
        pagination: response.pagination,
      }
    );
  },
  async delete(ctx) {
    const { id } = ctx.params;
    const useCaseStep = await strapi.db
      .query("api::use-case-step.use-case-step")
      .findOne({
        where: {
          ressource: id,
        },
      });

    if (useCaseStep) {
      const useCaseStepResponse = await strapi
        .service("api::use-case-step.use-case-step")
        .delete(useCaseStep.id);
      if (useCaseStepResponse.id) {
        await strapi.service("api::ressource.ressource").delete(id);
      }
    }
  },
}));
