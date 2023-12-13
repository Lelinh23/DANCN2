var express = require("express");
const { addYeuThich, xoaYeuThich, getYeuThich } = require("../services/LoveServiecs");
var router = express.Router();

router.get("/", async (req, res) => {
    let email = req?.email; // Fix typo here
    let response = await getYeuThich({ email }); // Fix typo here
    console.log(email); // Log the correct variable
    res.json(response);
});

router.post("/:IdNhaHang", async (req, res) => {
    let { IdNhaHang } = req?.params;
    let email = req?.email; // Fix typo here
    let response = await addYeuThich({ IdNhaHang, email }); // Fix typo here
    console.log(IdNhaHang);
    console.log(email); // Log the correct variable
    res.json(response);
});

router.delete("/:IdNhaHang", async (req, res) => {
    let { IdNhaHang } = req?.params;
    let email = req?.email; // Fix typo here
    let response = await xoaYeuThich({ IdNhaHang, email }); // Fix typo here
    console.log(IdNhaHang);
    console.log(email); // Log the correct variable
    res.json(response);
});

module.exports = router;
