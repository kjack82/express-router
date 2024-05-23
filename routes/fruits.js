const express = require("express");
const { Fruit } = require("../models");

const router = express.Router();
const { check, validationResult } = require("express-validator")

router.post("/", [
    check("color").notEmpty().trim(),
    check("name").notEmpty().trim()
]
    async (req, res) => {
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



module.exports = router