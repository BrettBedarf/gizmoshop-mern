import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    let adminUser;
    const usersInserted = await User.insertMany(users);
    console.log(`Successfully inserted users`.green.inverse);
    adminUser = usersInserted[0]._id;
    //add admin user to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log('Successfully inserted products'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error importing data ${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = () => {
  //delete all existing data
  Promise.allSettled([
    Order.deleteMany(),
    Product.deleteMany(),
    User.deleteMany(),
  ])
    .then((values) => {
      console.log('Succesfully deleted existing data'.green.inverse);
      process.exit();
    })
    .catch((err) => {
      console.error(`Error deleting existing data ${err}`.red.inverse);
      process.exit();
    });
};

process.argv[2] === '-d' ? destroyData() : importData();
