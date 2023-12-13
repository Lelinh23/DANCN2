var express = require("express");
const { addToCart, XoaKhoiCart, getCartItems } = require("../services/CartServiecs");
var router = express.Router();

router.get("/", async (req, res) => {
    let email = req?.email; // Fix typo here
    let response = await getCartItems({ email }); // Fix typo here
    res.json(response);
});

router.post("/:foodId", async (req, res) => {
    let { foodId } = req?.params;
    let email = req?.email; // Fix typo here
    let response = await addToCart({ foodId, email }); // Fix typo here
    res.json(response);
});

router.delete("/:foodId", async (req, res) => {
    let { foodId } = req?.params;
    let email = req?.email; // Fix typo here
    let response = await XoaKhoiCart({ foodId, email }); // Fix typo here
    res.json(response);
});

module.exports = router;
