'use strict';

/**
 * chat-bot-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::chat-bot-user.chat-bot-user');
