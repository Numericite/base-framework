module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: env('SMTP_HOST', 'localhost'),
        port: env.int('SMTP_PORT', 465),
        secure: env('SMTP_SECURE', true),
        username: env('SMTP_USERNAME', 'username'),
        password: env('SMTP_PASSWORD', 'password'),
        rejectUnauthorized: env('SMTP_REJECT_UNAUTHORIZED', true),
        requireTLS: env('SMTP_TLS', true),
        connectionTimeout: env.int('SMTP_TIMEOUT', 1)
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'my.user@email.loc'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'my.user@email.loc')
      }
    }
  },
  upload: {
    config: {
      providerOptions: {
        sizeLimit: 1500 * 1024 * 1024
      }
    }
  }
});
