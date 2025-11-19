import { useEffect, useState } from "react";
import mqtt from "mqtt";
import type { MqttClient } from "mqtt";
import "./NodeMetricsPanel.css"
interface NodeMetrics {
  temperature: number;
  humidity: number;
  pressure: number;
  status: string;
  timestamp: string;
}

interface NodeMetricsPanelProps {
  nodeId: number;
}

const NodeMetricsPanel: React.FC<NodeMetricsPanelProps> = ({ nodeId }) => {
  const [metrics, setMetrics] = useState<NodeMetrics | null>(null);

  useEffect(() => {
    const client: MqttClient = mqtt.connect("ws://localhost:9001", {
      reconnectPeriod: 1000, 
      connectTimeout: 4000,
    });

    client.on("connect", () => {
      console.log(`Connected to MQTT broker for node ${nodeId}`);
      client.subscribe(`node/${nodeId}/metrics`, { qos: 0 }, (err) => {
        if (err) console.error("Subscribe error:", err);
        else console.log(`Subscribed to node/${nodeId}/metrics`);
      });
    });

    client.on("message", (topic, message) => {
      try {
        const data: NodeMetrics = JSON.parse(message.toString());
        setMetrics(data);
      } catch (e) {
        console.error("Invalid MQTT message:", e);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT client error:", err);
    });

    // Cleanup on unmount
    return () => {
      if (client.connected) {
        client.unsubscribe(`node/${nodeId}/metrics`);
        client.end();
      }
    };
  }, [nodeId]);

  if (!metrics) return <div>No data yet...</div>;

  return (
    <div className="dashboard-nodeMetric">
      <h2>Node {nodeId} Metrics</h2>
      <p>Temperature: {metrics.temperature} °C</p>
      <p>Humidity: {metrics.humidity} %</p>
      <p>Pressure: {metrics.pressure} hPa</p>
      <p>Status: {metrics.status}</p>
      <p>Updated: {new Date(metrics.timestamp).toLocaleTimeString()}</p>
    </div>
  );
};

export default NodeMetricsPanel;
