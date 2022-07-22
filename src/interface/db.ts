import mongoose from 'mongoose';

export default async (url: string): Promise<void> => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log('🎉 Connected to mongodb');
    })
    .catch((err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.' + err
      );
      process.exit();
    });
};
