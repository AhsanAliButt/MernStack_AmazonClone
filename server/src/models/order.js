const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId, // user id
//       ref: "User",
//       required: true,
//     },
//     orderItem: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId, // product id
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         ImageUrl: {
//           type: String,
//           required: true,
//         },
//         name: {
//           type: String,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//           default: 0,
//         },
//       },
//     ],
//     shippingAddress: {
//       address: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       country: {
//         type: String,
//         required: true,
//       },
//       postalCode: {
//         type: String,
//         required: true,
//       },
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//     },
//     paymentResult: {
//       id: {
//         type: String,
//       },
//       status: {
//         type: String,
//       },
//       upload_status: {
//         type: String,
//       },
//       emailaddress: {
//         type: String,
//       },
//     },
//     taxPrice: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     shippingPrice: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     isPaid: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     paidAt: {
//       type: Date,
//       default: null,
//     },
//     isDelivered: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     deliveredAt: {
//       type: Date,
//       default: null,
//     },
//     isCancelled: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String, // user id
      ref: "User",
      required: true,
    },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: [
      {
        product: {
          type: String, // product id
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        ImageUrl: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        brand: {
          type: String,
        },
        description: { type: String, required: true },
        cartQuantity: { type: Number },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      default: false,
    },
    total: {
      type: Number,
      required: true,
      default: null,
    },
    shipping: {
      type: Object,
      required: true,
    },
    delivery_status: {
      type: String,
      default: "pending",
    },
    payment_status: {
      type: String,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
