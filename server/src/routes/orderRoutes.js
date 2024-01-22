const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const authMiddleware = require("../middlewares/authMiddleware");
const OrderController = require("../controllers/orderController");
const endpointSecret = "whsec_hSRbXEYv8j00LinmQKux431GtmMbfhaO";
const stripe = require("stripe")(
  "sk_test_51O4QRMIXiyixalhgE4m41L8eTMNHd9qGzki9Xok41TyYz5ja7LwjK5DEOX3tiQSGyXpL4t2SFaKfie6UGReVzO9i00wojtdPUv"
);

//Order Middleware
router.use("/addOrder", authMiddleware);
router.use("/getOrderById", authMiddleware);
router.use("/updateOrderToPaid", authMiddleware);
//UnProtected Routes (No Auth Middleware)
// router.get("/getAllOrders", OrderController.getAllOrders); //Get all orders
//Protecting the routes with the authentication middleware
// router.post("/addOrder", OrderController.createOrder); //Add order
// router.get("/getOrderById/:orderId", OrderController.getOrderById); //Get order by id
router.put("/updateOrderToPaid/:orderId", OrderController.updateOrderToPaid); //Update order to paid
router.put(
  "/updateOrderToPending/:orderId",
  OrderController.updateOrderToPending
); //Update order to pending
router.post("/create-checkout-session", OrderController.createCheckoutSession); //Make a payment
router.get("/getMyOrders/:userId", OrderController.getMyOrders); //Get my orders
router.post("/webhook/stripe", OrderController.webhookStripe); //webhookStripe route
// router.post("/webhook/stripe", async (req, res) => {
//   // Access the raw request body through req.rawBody
//   console.log("Received Stripe Webhook:", req.body);
//   const rawBody = req.rawBody;
//   // console.log("RAW BODYYYY", rawBody);

//   // Get the signature sent by Stripe
//   const signature = req.headers["stripe-signature"];

//   let event;

//   try {
//     // Pass the raw request body to constructEvent for signature verification
//     event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret, {
//       tolerance: 300,
//     });
//   } catch (error) {
//     console.log(`⚠️  Webhook signature verification failed.`, error.message);
//     return res.status(400).json({ success: false });
//   }
//   // Handle the event
//   switch (event.type) {
//     case "checkout.session.completed":
//       const checkoutSessionCompleted = event.data.object;
//       console.log("CHECKOUTSESSION COMPLETED", checkoutSessionCompleted);
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // if successfull
//   OrderController.webhookStripe(req, res);
//   // Respond to the webhook request
//   res.json({ received: true });
// });

// router.post("/webhook/stripe", async (req, res) => {
//   const rawBody = req.rawBody;
//   const sig = req.headers["stripe-signature"];
//   let data;
//   let eventType;
//   let event;
//   if (endpointSecret) {
//     try {
//       event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret, {
//         tolerance: 1000,
//       });
//       console.log("Webhook Verified");
//     } catch (err) {
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
//     data = event.data.object;
//     eventType = event.type;
//   } else {
//     data = req.body.data.object;
//     eventType = req.body.type;
//     console.log("Webhook Else", data, eventType);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "checkout.session.completed":
//       const checkoutSessionCompleted = event.data.object;
//       console.log("Data is coming from webhook", checkoutSessionCompleted);
//       const line_items = await stripe.checkout.sessions.listLineItems(
//         event.data.object.id
//       );
//       console.log("LINE ITEMS", line_items);
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }
//   // if successfull
//   // OrderController.addOrderItem(req, res);
//   // Return a 200 response to acknowledge receipt of the event
//   res.json({ received: true });
// });
// router.post("/webhook/stripe", async (req, res) => {
//   const rawBody = req.rawBody;
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret, {
//       tolerance: 100000,
//     });
//     console.log("Webhook Verified");
//   } catch (err) {
//     console.error(`Webhook Error: ${err.message}`);
//     return res.status(400).json({ error: `Webhook Error: ${err.message}` });
//   }

//   // Handle the event
//   switch (event.type) {
//     case "checkout.session.completed":
//       const checkoutSessionCompleted = event.data.object;
//       console.log("Data is coming from webhook", checkoutSessionCompleted);
//       // Then define and call a function to handle the event checkout.session.completed
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   try {
//     // if successfull
//     // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
//     const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//       event.data.object.id,
//       {
//         expand: ["line_items"],
//       }
//     );
//     const lineItems = sessionWithLineItems.line_items;
//     console.log("lineItems>>>>>>>>>: " + lineItems);
//     // Fulfill the purchase...
//     OrderController.addOrderItem(req, lineItems);

//     // Return a 200 response to acknowledge receipt of the event
//     res.json({ received: true });
//   } catch (error) {
//     console.error("Error in OrderController.addOrderItem:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
