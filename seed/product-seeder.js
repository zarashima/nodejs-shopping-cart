var Product = require("../models/product")
var faker = require('faker')
var mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)

var products = [
  new Product({
    imagePath: "https://i.imgur.com/fUeEwSq.jpg",
    title: faker.lorem.sentence(),
    description:
      faker.lorem.paragraph(),
    price: faker.commerce.price()
  }),
  new Product({
    imagePath: "https://i.imgur.com/OiIgRdh.jpg",
    title: faker.lorem.sentence(),
    description:
        faker.lorem.paragraph(),
    price: faker.commerce.price()
  }),
  new Product({
    imagePath: "https://i.imgur.com/hKJYEAH.jpg",
    title: faker.lorem.sentence(),
    description:
        faker.lorem.paragraph(),
    price: faker.commerce.price()
  })
]

var done = 0
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++
    if (done === products.length) {
      exit()
    }
  })
}

function exit() {
  mongoose.disconnect()
}
