const express = require("express");
const { User } = require("../models");

const router = express.Router();
const { check, validationResult } = require("express-validator")

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

router.post("/", [
    check("name").notEmpty().trim(), 
    check("age").notEmpty().trim()
]
    async function (req, res) {
    const errors = await validateResult(req)
    if (result.isEmpty()) {
        User.push(req.body)
        res.json(User)
    } else {
        res.json({
            error: errors.array()
        })
    }
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