'use strict';

/**
 * theme service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::theme.theme');
