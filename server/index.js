// Fastify plugin autogenerated by fastify-openapi-glue
import openapiGlue from "fastify-openapi-glue";
import cors from "fastify-cors";
import fastifySwagger from "fastify-swagger";
import service from "./service.js";
import securityHandlers from "./security.js";
const localFile = (fileName) => new URL(fileName, import.meta.url).pathname;

const options = {
  specification: localFile("./openApi.json"),
  service,
  securityHandlers,
  ajvOptions: {
    allErrors: true
  },
};

export default async function (fastify, opts) {
  // Need this because of Browser SOP
  fastify.register(cors, { origin: true });
  // This is just nice to have - gives us swagger docs and client on /documentation
  // Initially I thought this would do validation, but no such luck
  fastify.register(fastifySwagger, {
    routePrefix: "/documentation",
    mode: "static",
    specification: {
      path: "./openApi.json",
    },

    exposeRoute: true,
  });
  // This actually does most of the heavy lifting and validates incoming JSON using the openAPI spec
  fastify.register(openapiGlue, options);
}
