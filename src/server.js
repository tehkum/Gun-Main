import mongoose from 'mongoose';

const URL = 'mongodb://127.0.0.1:27017';

const connectDB = () => {
  mongoose
    .connect(URL, {
      dbName: "gungun",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};


export {connectDB}
    
