// // server.js
// //
// // Use this sample code to handle webhook events in your integration.
// //
// // 1) Paste this code into a new file (server.js)
// //
// // 2) Install dependencies
// //   npm install stripe
// //   npm install express
// //
// // 3) Run the server on http://localhost:4242
// //   node server.js

// // The library needs to be configured with your account's secret key.
// // Ensure the key is kept out of any version control system you might be using.
const stripe = require("stripe")(process.env.STRIPE_WEBHOOK_SECRET);
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// const express = require("express");
// const app = express();

// // This is your Stripe CLI webhook secret for testing your endpoint locally.


app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        console.log(`event type ${checkoutSessionCompleted}`);
        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
