const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.get("/", async function (req, res) {
    const users = await User.findAll();
    res.send(users);
});

router.get("/:userId", async function (req, res) {
    const user = await User.findByPk(req.params.userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({});
    }
    })

    router.post("/", async function (req, res) {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
        })
        res.send(user)
    })

    router.put("/:userId", async function (req, res) {
        let user = await User.findByPk(req.params.userId);
        if (user) {
            user = await user.update({
                name: req.body.name,
                age: req.body.age,
            })
                res.send(user)
        } else {
            res.status(404).send({});
        }
    })

    router.delete("/:userId", async function (req, res) {
            let user = await User.findByPk(req.params.userId);
            if (user) {
                user = await user.destroy();
                res.status(204).send();
            } else {
                res.status(404).send({})
            }
})

module.exports = router