const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Please enter a book name"],
    minlength: [5, "Book name must be at least five characters long!"],
    maxLength: [50, "Book land cannot exceed 100 characters!" ],
  },
  countInStock: {
    type: Number,
    required: [true, "Stock count is required!"],
    min: [1, "Stock count cannot be less then 1!"],
    max: [255, "Stock count cannot exceed 255!"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price"],
    min: [1, "Price count cannot be less then 1!"],
    max: [200, "Price count cannot exceed 200!"],
  },
  dateCreated: {
    type: Date,
    required: [true, "Please enter a date"],
    default: Date.now(),
  },
  image: {
    type: String,
    default: '',
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
    },
    message: 'image must be valid URL, please try again!',
  },
});

bookSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

bookSchema.set('toJSON', {
  virtuals: true,
})

const BookModel = mongoose.model('Book', bookSchema)


module.exports = mongoose.model('Book', bookSchema)