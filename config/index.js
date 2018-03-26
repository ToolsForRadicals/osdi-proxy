const log = require("debug")("osdi-proxy:");
const adaptors = "bsd ak van an nb".split(" ");

const options = adaptors.reduce(
  (acc, crm) => Object.assign(acc, { [crm]: require(`./${crm}`) }),
  {}
);

const selection = process.env.USE_CRM;

if (!adaptors.includes(selection)) {
  log("[Error]: Missing env var USE_CRM – must be one of %j", adaptors);
  process.exit();
}

options[selection].validate();

module.exports = Object.assign(options[selection], {
  route: `/${selection}`,
  baseUrl: process.env.PROXY_BASE_URL,
  readOnly: process.env.READ_ONLY == "true"
});
