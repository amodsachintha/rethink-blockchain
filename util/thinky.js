const thinky = require('thinky')({
    host: "localhost",
    port: 28015,
    password: "vault",
    db: "vault"
});

module.exports = thinky;