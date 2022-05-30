const express = require("express");
const router = express.Router()
const tagCtrl = require("../controller/tag")


router.get('/tags',tagCtrl.getTag)


module.exports = router;