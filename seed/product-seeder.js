var Product = require("../models/product")
var faker = require('faker')
var mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB_URI)

var products = [
  new Product({
    imagePath: faker.image.technics(),
    title: faker.lorem.sentence(),
    description:
      faker.lorem.paragraph(),
    price: faker.commerce.price()
  }),
  new Product({
    imagePath: faker.image.business(),
    title: faker.lorem.sentence(),
    description:
        faker.lorem.paragraph(),
    price: faker.commerce.price()
  }),
  new Product({
    imagePath: faker.image.city(),
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
