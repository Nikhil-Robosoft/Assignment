export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'secret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'N+4MiOH6Dqd0EmAbPP7esQ=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
