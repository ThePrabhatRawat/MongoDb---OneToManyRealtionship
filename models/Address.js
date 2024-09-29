const mongoose = require("mongoose");


const addressSchema = mongoose.Schema({
    street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
})


const Address = mongoose.model("Address" , addressSchema);

module.exports = Address;