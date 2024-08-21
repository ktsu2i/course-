const express = require("express");
const next = require("next");
const session = require("express-session");
const Keycloak = require("keycloak-connect");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // session
  const memoryStore = new session.MemoryStore();
  server.use(
    session({
      secret: "",
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  // keycloak
  const keycloak = new Keycloak({ store: memoryStore });

  // keycloak middleware
  server.use(keycloak.middleware());

  // api routes
  server.get("/api/protected", keycloak.protect(), (req, res) => {
    res.json({ message: "this is a protected api route" });
  });

  // handle all other requests for next.js
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // run server
  server.listen(3000, (error) => {
    if (error) throw error;
    console.log("> Ready on http://localhost:3000");
  });
});
