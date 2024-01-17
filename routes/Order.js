var express = require("express");
const { datHang, getAllOrder, updateStatusOrder, trackOrder } = require("../services/OrderServiecs");
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

router.put("/updateStatus/:orderId", async (req, res) => {
    let orderId = req?.params?.orderId;
    let newStatus = req?.body?.status;
    let response = await updateStatusOrder(orderId, newStatus);
    res.json(response);
});

router.get("/trackOrder/:orderId", async (req, res) => {
    let orderId = req?.params?.orderId;
    let response = await trackOrder(orderId);
    res.json(response);
});
module.exports = router;