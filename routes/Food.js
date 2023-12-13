var express = require("express");
const { getFoodBy1Id } = require("../services/FoodServiecs");
var router = express.Router();

router.get("/:foodId", async (req, res) => {
    let foodId  = req?.params?.foodId;
    let response = await getFoodBy1Id(foodId); // Fix typo here
    res.json(response);
});

module.exports = router;
