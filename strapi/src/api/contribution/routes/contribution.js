'use strict';

/**
 * contribution router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::contribution.contribution');
