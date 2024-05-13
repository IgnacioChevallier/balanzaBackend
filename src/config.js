const config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || '#';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '52.71.113.81';
config.mqtt.port      = process.env.MQTT_PORT      || 9000;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '44.194.80.153';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'test';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';

module.exports = config;