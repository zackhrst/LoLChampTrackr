module.exports = app => {
    const champions = require("../controllers/champion.controller");

    var router = require("express").Router();

    router.post("/", champions.create);

    router.get("/", champions.findAll);

    router.get("/owned", champions.findAllOwned);

    router.get("/:id", champions.findOne);

    router.put("/:id", champions.update);

    router.delete("/:id", champions.delete);

    router.delete("/", champions.deleteAll);

    app.use('/api/champions', router);
};