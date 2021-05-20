const db = require("../models");
const Champion = db.champions;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const champion = {
        name: req.body.name,
        description: req.body.description,
        owned: req.body.owned ? req.body.owned : false
    };

    Champion.create(champion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Champion."
            });
        });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Champion.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Champions."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Champion.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Champion with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Champion.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Champion was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Champion with id=${id}. Maybe Champion was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Champion with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Champion.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Champion was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Champion with id=${id}. Maybe Champion was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Champion with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Champion.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Champions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Champions."
            });
        });
};

exports.findAllOwned = (req, res) => {
    Champion.findAll({ where: { owned: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured whule retrieving Champions."
            });
        });
};