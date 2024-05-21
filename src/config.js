const config = {};

config.debug = process.env.DEBUG || true;

config.app = {};
config.app.port = process.env.APP_PORT || 3333;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || '#';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '52.71.113.81';
config.mqtt.port      = process.env.MQTT_PORT      || 9000;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '172.31.85.3'; // private ip
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'test';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';

module.exports = config;