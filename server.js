const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const rules = auth.rewriter(require("./routes.json"));

server.db = router.db;

const allowedOrigins = [
  "http://localhost:5173",
  "https://mens-shop-zeta.vercel.app",
];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);


const PORT = process.env.PORT || 3000;


server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server is running on ${PORT}`);
});