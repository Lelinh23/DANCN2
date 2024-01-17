var express = require("express");
const { getFoodBy1Id, getFoodByNameAndCategory } = require("../services/FoodServiecs");
var router = express.Router();

router.get("/:foodId", async (req, res) => {
    let foodId  = req?.params?.foodId;
    let response = await getFoodBy1Id(foodId); // Fix typo here
    res.json(response);
});

router.post('/foods/danhmuc', async (req, res) => {
    const foodName  = req?.body?.foodName;
    const result = await getFoodByNameAndCategory(foodName);
    res.json(result);
});

module.exports = router;
