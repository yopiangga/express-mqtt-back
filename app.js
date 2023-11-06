const express = require("express");
const app = express();
const mqtt = require("mqtt");

// Define your MQTT broker URL
const mqttBrokerUrl = "mqtt://207.148.121.3";

// Connect to the MQTT broker
const mqttClient = mqtt.connect(mqttBrokerUrl);

// Handle MQTT connection event
mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to one or more MQTT topics
  const topicsToSubscribe = ["topic1"];
  mqttClient.subscribe(topicsToSubscribe, (err, granted) => {
    if (!err) {
      console.log("Subscribed to topics:", granted);
    } else {
      console.error("Error subscribing to topics:", err);
    }
  });
});

// Handle MQTT message reception
mqttClient.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);

  mqttClient.publish("topic3", message + " reply");
});

// Start your Express.js server
app.listen(3000, () => {
  console.log("Express server is running on port 3000");
});
