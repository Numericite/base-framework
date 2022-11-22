const cryptoRandomString = require("crypto-random-string");

const monthReferences = [
  { name: "de Janvier", value: 1 },
  { name: "de Février", value: 2 },
  { name: "de Mars", value: 3 },
  { name: "d'Avril", value: 4 },
  { name: "de Mai", value: 5 },
  { name: "de Juin", value: 6 },
  { name: "de Juillet", value: 7 },
  { name: "d'Août", value: 8 },
  { name: "de Septembre", value: 9 },
  { name: "d'Octobre", value: 10 },
  { name: "de Novembre", value: 11 },
  { name: "de Décembre", value: 12 },
];

const frontUrl = process.env.FRONTEND_URL;
const replyEmail = process.env.SMTP_REPLY_TO;

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  // FOR TEST PURPOSE ONLY
  // "0 * * * * *": async ({ strapi }) => {
  "1 15 * * *": async ({ strapi }) => {
    const todayDate = new Date();
    const humanMissions = await strapi
      .service("api::human-mission.human-mission")
      .find({
        filters: {
          $or: [
            { end_date: null },
            { end_date: { $gte: todayDate.toISOString().substring(0, 10) } },
          ],
        },
        populate: {
          human: true,
          mission: true,
        },
      });

    strapi.log.info(
      `BEGIN CREATING CRA TOKENS FOR ${
        todayDate.getMonth() + 1
      }/${todayDate.getFullYear()}`
    );
    humanMissions.results.forEach((hm) => {
      const randomToken = cryptoRandomString(24);
      strapi.service("api::cra-token.cra-token").create({
        data: {
          month: todayDate.getMonth() + 1,
          year: todayDate.getFullYear(),
          human_mission: hm.id,
          token: randomToken,
        },
      });
      strapi.log.info(
        `CREATING CRA FOR ${hm.human.first_name} ${hm.human.last_name} ABOUT PRODUCT ${hm.mission.name} (token : ${randomToken})`
      );
    });
  },

  // FOR TEST PURPOSE ONLY
  // "* * * * * *": async ({ strapi }) => {
  "2 15 * * *": async ({ strapi }) => {
    const todayDate = new Date();

    const craTokens = await strapi.service("api::cra-token.cra-token").find({
      _limit: 10000,
      populate: {
        human_mission: {
          populate: {
            human: true,
          },
        },
      },
    });

    const grouped = craTokens.results.reduce(function (r, a) {
      r[a.human_mission.human.email] = r[a.human_mission.human.email] || [];
      r[a.human_mission.human.email].push(a);
      return r;
    }, {});

    strapi.log.info(
      `BEGIN SENDING CRA EMAILS FOR ${
        todayDate.getMonth() + 1
      }/${todayDate.getFullYear()}`
    );
    for (const [email, emailCraTokens] of Object.entries(grouped)) {
      if (emailCraTokens.length > 0) {
        const token = emailCraTokens[0].token;
        const first_name = emailCraTokens[0].human_mission.human.first_name;
        const last_name = emailCraTokens[0].human_mission.human.last_name;
        const monthName =
          monthReferences.find((_) => _.value === emailCraTokens[0].month)
            ?.name || "?";
        const html = `
					<p>👋 Bonjour ${first_name},</p>
					<p>Voici un lien vers un formulaire pour compléter ton rapport d'activité du mois ${monthName} !</p>
					<p>Attention, tu n'as que jusqu'au dernier jour du mois pour le faire.</p>
					<p><a href="${frontUrl}/cra/${token}">${frontUrl}/cra/${token}</a></p>
					<p>N'hésite pas à nous contacter en cas de question en réponse à cet email où à ${replyEmail}.</p><br />
					À Bientôt, <br />
					L'équipe Numéricité.
					`;
        const text = `
					👋 Bonjour ${first_name},\n\n
					Voici un lien vers un formulaire pour compléter ton rapport d'activité du mois de ${monthName} !\n\n
					Attention, tu n'as que jusqu'au dernier jour du mois pour le faire. \n\n
					${frontUrl}/cra/${token} \n\n
					N'hésite pas à nous contacter en cas de question en réponse à cet email où à ${replyEmail}.\n\n\n\n
					À Bientôt, \n
					L'équipe Numéricité.
					`;
        strapi.plugins["email"].services.email
          .send({
            to: email,
            subject: `Numéricité : ton compte rendu d'activité du mois de ${monthName}`,
            html,
            text,
          })
          .then(() => {
            strapi.log.info(
              `CRA EMAIL SENDED FOR ${first_name} ${last_name} at ${new Date().toISOString()}`
            );
          })
          .catch(() => {
            strapi.log.error(`
						 CRA EMAIL FAILED FOR ${first_name} ${last_name} at ${new Date().toISOString()}`);
          });
      }
    }
  },
};
