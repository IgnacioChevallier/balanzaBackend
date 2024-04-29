const config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || '#';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '52.23.242.25';
config.mqtt.port      = process.env.MQTT_PORT      || 9000;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '52.87.160.176';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'test';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';

module.exports = config;