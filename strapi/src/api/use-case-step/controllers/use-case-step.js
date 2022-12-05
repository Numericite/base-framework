"use strict";

/**
 * use-case-step controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::use-case-step.use-case-step"
  // () => ({
  //   async find(ctx) {
  //     const { data, meta } = await super.find(ctx);

  //     const useCasesSteps = await strapi
  //       .service("api::use-case-step.use-case-step")
  //       .find({
  //         populate: {
  //           use_case: true,
  //         },
  //       });

  //     return { data: useCasesSteps, meta };
  //   },
  // })
);
