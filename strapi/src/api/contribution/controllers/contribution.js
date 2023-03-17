"use strict";

/**
 * contribution controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contribution.contribution", () => ({
  async update(ctx) {
    const { data, meta } = await super.update(ctx);

    const email = data.attributes.email;

    const acceptedEmailTemplate = {
      subject: "Votre contribution à la Ressourcerie PFRH a été acceptée",
      text: "Bonjour, votre contribution a été acceptée. Elle va être traitée par le comité éditorial de la plateforme. Vous recevrez un email de confirmation lorsque votre contribution sera publiée sur la plateforme.",
      html: "Bonjour, votre contribution a été acceptée. Elle va être traitée par le comité éditorial de la plateforme. Vous recevrez un email de confirmation lorsque votre contribution sera publiée sur la plateforme.",
    };

    const publishedEmailTemplate = {
      subject: "Votre contribution à la Ressourcerie PFRH a été publiée",
      text: "Bonjour, votre contribution a été publiée. Vous pouvez la retrouver sur la plateforme dans l'onglet ressources.",
      html: "Bonjour, votre contribution a été publiée. Vous pouvez la retrouver sur la plateforme dans l'onglet ressources.",
    };

    if (data.attributes.status === "accepted") {
      try {
        strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: email,
          },
          acceptedEmailTemplate
        );
      } catch (error) {
        console.log("error", error);
      }
    }

    if (data.attributes.status === "published") {
      try {
        strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: email,
          },
          publishedEmailTemplate
        );
      } catch (error) {
        console.log("error", error);
      }
    }

    return { data, meta };
  },
}));
