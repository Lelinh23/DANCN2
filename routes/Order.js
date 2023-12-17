var express = require("express");
const { datHang, getAllOrder } = require("../services/OrderServiecs");
var router = express.Router();

router.post("/", async (req, res) => {
    let email = req?.email;
    let address = req?.body;
    let response = await datHang({ email, address });
    res.json(response);
    console.log(response)
});

router.get("/:email", async (req, res) => {
    let email  = req?.params?.email;
    let response = await getAllOrder(email); // Fix typo here
    res.json(response);
});
module.exports = router;