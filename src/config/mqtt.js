const connectOptions = {
  port: process.env.MQTT_CREDENTIALS_PORT
    ? parseInt(process.env.MQTT_CREDENTIALS_PORT, 10)
    : undefined,
  host: process.env.MQTT_CREDENTIALS_HOST,
  protocol: process.env.MQTT_CREDENTIALS_PROTOCOL,
  path: process.env.MQTT_PATH || "/",
};

export default connectOptions;
