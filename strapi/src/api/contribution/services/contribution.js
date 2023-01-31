'use strict';

/**
 * contribution service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contribution.contribution');
