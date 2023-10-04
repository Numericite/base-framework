'use strict';

/**
 * question service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::question.question');
