const config = require("/elliotCred.json");

module.exports = () => {
  const env = process.env.NODE_ENV;
  const redis = config.redis;

  const awsCredentials = config.awsCredentials;

  return {
    appName: "ELLIOT",
    redis: redis[env],
    awsCredentials: awsCredentials[env],
    facebook: config.facebook
  }
};
