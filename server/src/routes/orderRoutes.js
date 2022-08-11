const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const OrderController = require("../controllers/orderController");

//Order Middleware
router.use("/addOrder", authMiddleware);
router.use("/getOrderById", authMiddleware);
router.use("/updateOrderToPaid", authMiddleware);
//UnProtected Routes (No Auth Middleware)
router.get("/getAllOrders", OrderController.getAllOrders); //Get all orders
//Protecting the routes with the authentication middleware
router.post("/addOrder", OrderController.createOrder); //Add order
router.get("/getOrderById/:orderId", OrderController.getOrderById); //Get order by id
router.put("/updateOrderToPaid/:orderId", OrderController.updateOrderToPaid); //Update order to paid
router.put(
  "/updateOrderToPending/:orderId",
  OrderController.updateOrderToPending
); //Update order to pending
router.get("/getMyOrders/:userId", OrderController.getMyOrders); //Get my orders

module.exports = router;
