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

  createCheckoutSession: async (req, res) => {
    const { products } = req.body;
    console.log("createPaymentInController", products);
    console.log("createPaymentInController", products.cartItems.quantity);
    try {
      // Perform any necessary validation or data processing here
      // const { id, amount, currency, userId, paymentMethod, status } = req.body;
      const userEmail = req.body;
      console.log("USER EMAIL>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", userEmail);
      const lineItems = products?.cartItems?.map((product) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: product.name,
            images: [product.imageUrl],
            metadata: { productId: product._id },
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        custom_text: {
          shipping_address: {
            message:
              "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
          },
          submit: {
            message: "We'll email you instructions on how to get started.",
          },
        },
        success_url: "http://localhost:3000/successPayment",
        cancel_url: "http://localhost:3000/cancelPayment",
      });

      // Save payment data to your MongoDB using Mongoose
      const { id, amount_total, currency, payment_status } = session;
      const payment = new paymentModel({
        // Map Stripe session data to your schema
        // e.g., session_id, user_id, product details, etc.

        id: id,
        amount: amount_total,
        currency: currency,
        // userId, // Include the user who made the payment
        // paymentMethod:payment_status, // Include the payment method used
        // status, // Include the payment status
        sessionId: session.id, // Map Stripe session ID
        // Add other fields as needed
      });
      await payment.save();
      console.log("SESSSSSSIIIIIOOOOONNNNN", JSON.stringify(session));

      res.status(200).json({ status: 200, id: session.id });
    } catch (error) {
      console.error("Payment error:", error);
      res.status(500).json({ status: 500, error: "Payment failed" });
    }
  },
  webhookStripe: async (req, res) => {
    const rawBody = req.rawBody;
    const sig = req.headers["stripe-signature"];
    let data;
    let eventType;
    let event;
    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret, {
          tolerance: 1000,
        });
        console.log("Webhook Verified");
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
      console.log("Webhook Else", data, eventType);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        // const checkoutSessionCompleted = event.data.object;
        // console.log("Data is coming from webhook", checkoutSessionCompleted);
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            // console.log("CUSTOMER FROM WEBHOOK", customer);
            // console.log("Data >>>>>>>>", data);
            // createOrder(customer, data);
          })
          .catch((err) => console.log("ERROR FROM WEBHOOK", err.message));
        const line_items = await stripe.checkout.sessions.listLineItems(
          event.data.object.id
        );
        console.log("LINE ITEMS", line_items);
        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // if successfull
    // OrderController.addOrderItem(req, res);
    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  },
};
// async function createOrder(customer, data) {
//   const Items = JSON.parse(customer.metadata.cart);
//   console.log(`Create Order ITEMS >>>>`, );
//   const newOrderItem = OrderModel({
//     user: customer.metadata.userId,
//     customerId: data.customer,
//     products: Items,
//     subtotal: data.amount_subtotal,
//     total: data.amount_total,
//     shipping: data.customer_details,
//     payment_status: data.payment_status,
//   });
//   try {
//     const createOrder = await newOrderItem.save();
//     console.log("Order Created >>>", createOrder);
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = OrderController;
