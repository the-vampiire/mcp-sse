import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from "express";
import { z } from "zod";

const server = new McpServer({
  name: "Weather Service",
  version: "1.0.0",
});

server.tool(
  "getWeather",
  {
    city: z.string(),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: "text",
          text: `The weather in ${city} is sunny!`,
        },
      ],
    };
  },
);

const app = express();

let transport: SSEServerTransport;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/message", res);
  console.log(`connecting to transport ${transport.sessionId}`);
  await server.connect(transport);
});

app.post("/message", async (req, res) => {
  console.log("received message, checking for transport");

  if (!transport) {
    console.log("no transport available");
    res.status(500);
    res.json({ error: "No transport" });
    return;
  }

  console.log(`posting message to transport ${transport.sessionId}`);
  await transport.handlePostMessage(req, res);
});

app.listen(3500, () => {
  console.log("listening on port 3500");
});
