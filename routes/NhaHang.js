var express = require('express');
const { getAllNhaHang, getNhaHangTheo1Id } = require('../services/NhaHangServiecs');
var router = express.Router();

router.get('/', async (req, res) => {
    let Nhahang = await getAllNhaHang();
    res.json(Nhahang);
});
  
router.get('/:IdNhaHang', async (req, res) => {
    let IdNhaHang = req?.params?.IdNhaHang
    let Nhahang = await getNhaHangTheo1Id(IdNhaHang);
    res.json(Nhahang);
});
module.exports = router;