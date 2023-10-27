const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const CartController = require("../controllers/cartController");

//Product Middleware
router.use("/addToCart", authMiddleware);

//Protecting the routes with the authentication middleware
router.post("/addToCart", CartController.addItemToCart); //Add Cart
router.post("/getCart", CartController.getCart); //Get Cart
router.patch("/decreaseQuantity", CartController.decreaseQuantity); //Get Cart
// router.put("/updateProduct/:id", ProductController.updateProduct); //Update product
// router.delete("/deleteProduct/:id", ProductController.deleteProduct); //Delete product
// router.get("/getUserProducts/:userId", ProductController.getProductByUserId); //user's product
// cartRouter.post("/:userId", CartController.addItemToCart);
// cartRouter.get("/:userId", CartController.getCart);
// cartRouter.patch("/:userId", CartController.decreaseQuantity);
// cartRouter.delete("/:userId", CartController.removeItem);
module.exports = router;
