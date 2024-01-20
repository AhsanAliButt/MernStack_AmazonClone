const mongoose = require("mongoose");
const OrderModel = require("../models/order");
const ProductModel = require("../models/product");
const Cart = require("../models/cart");
const endpointSecret = "whsec_hSRbXEYv8j00LinmQKux431GtmMbfhaO";
const stripe = require("stripe")(
  "sk_test_51O4QRMIXiyixalhgE4m41L8eTMNHd9qGzki9Xok41TyYz5ja7LwjK5DEOX3tiQSGyXpL4t2SFaKfie6UGReVzO9i00wojtdPUv"
);
const OrderController = {
  // addOrderItem: async (req, res) => {
  //   const {
  //     orderItems,
  //     shippingAddress,
  //     paymentMethod,
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     totalPrice,
  //   } = req.body;
  //   if (
  //     !orderItems ||
  //     !shippingAddress ||
  //     !paymentMethod ||
  //     (orderItems && orderItems.length === 0)
  //   ) {
  //     return res.status(400).send("Missing required fields Or No order Found");
  //   } else {
  //     const newOrderItem = new OrderModel({
  //       orderItems,
  //       user: req.user._id,
  //       shippingAddress,
  //       paymentMethod,
  //       itemsPrice,
  //       taxPrice,
  //       shippingPrice,
  //       totalPrice,
  //     });
  //     const newOrder = await newOrderItem.save();
  //     return res.status(200).send(newOrder);
  //   }
  // },
  // addOrderItem: async (req, res) => {
  //   try {
  //     const {
  //       orderItems,
  //       shippingAddress,
  //       paymentMethod,
  //       itemsPrice,
  //       taxPrice,
  //       shippingPrice,
  //       totalPrice,
  //     } = req.body;

  //     if (
  //       !orderItems ||
  //       !shippingAddress ||
  //       !paymentMethod ||
  //       (orderItems && orderItems.length === 0)
  //     ) {
  //       return res
  //         .status(400)
  //         .send("Missing required fields Or No order Found");
  //     } else {
  //       const newOrderItem = new OrderModel({
  //         orderItems,
  //         user: req.user._id,
  //         shippingAddress,
  //         paymentMethod,
  //         itemsPrice,
  //         taxPrice,
  //         shippingPrice,
  //         totalPrice,
  //       });

  //       const newOrder = await newOrderItem.save();
  //       return res.status(200).json(newOrder); // Use json() instead of send()
  //     }
  //   } catch (error) {
  //     console.error("Error in addOrderItem:", error);
  //     return res.status(500).send("Internal Server Error");
  //   }
  // },
  addOrderItem: async (req) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      console.log("AddOrderItem", req.body);

      if (
        !orderItems ||
        !shippingAddress ||
        !paymentMethod ||
        (orderItems && orderItems.length === 0)
      ) {
        // Handle the case where there are missing required fields
        console.error("Missing required fields Or No order Found");
        return null; // or throw an error if appropriate
      } else {
        const newOrderItem = new OrderModel({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });

        const newOrder = await newOrderItem.save();
        return newOrder;
      }
    } catch (error) {
      console.error("Error in addOrderItem:", error);
      throw error; // You can choose to throw an error if needed
    }
  },
  getOrderById: async (req, res) => {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(404).send("Order Not Found");
    } else {
      return res.status(200).send(order);
    }
  },

  updateOrderToPaid: async (req, res) => {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).send("Order Not Found");
    } else {
      order.paidAt = new Date();
      order.paymentResult.status = "paid";
      order.paymentResult.upload_status = "uploaded";
      order.paymentResult.id = orderId;
      order.paymentResult.emailaddress = req.user.email;
      order.paymentResult.update_time = new Date();
      const updatedOrder = await order.save();
      return res.status(200).send(updatedOrder);
    }
  },

  updateOrderToPending: async (req, res) => {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).send("Order Not Found");
    } else {
      order.paymentResult.status = "pending";
      order.paymentResult.upload_status = "not uploaded";
      order.paymentResult.id = orderId;
      order.paymentResult.emailaddress = req.user.email;
      order.paymentResult.update_time = new Date();
      const updatedOrder = await order.save();
      return res.status(200).send(updatedOrder);
    }
  },

  getMyOrders: async (req, res) => {
    const { userId } = req.params;
    const orders = await OrderModel.find({ user: userId });
    if (!orders) {
      return res.status(404).send("No Orders Found");
    } else {
      return res.status(200).send(orders);
    }
  },
  webhookStripe: async (req, res) => {
    const rawBody = req.rawBody;
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret, {
        tolerance: 100000,
      });
      console.log("Webhook Verified");
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log("Data is coming from webhook", checkoutSessionCompleted);
        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    try {
      // if successfull
      // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;
      console.log("lineItems>>>>>>>>>: " + lineItems);
      // Fulfill the purchase...
      addOrderItem(req, lineItems);

      // Return a 200 response to acknowledge receipt of the event
      res.json({ received: true });
    } catch (error) {
      console.error("Error in OrderController.addOrderItem:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = OrderController;
