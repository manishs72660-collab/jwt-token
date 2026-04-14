const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://manishsingh:8294068776@codingadda.bzyu9qj.mongodb.net/myapp');
}

module.exports=main;