import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url =
      "mongodb+srv://admin:admin123456@cluster0.hmzji2b.mongodb.net/?retryWrites=true&w=majority";
    //await mongoose.connect("mongodb://127.0.0.1/sistema");
    await mongoose.connect(url);

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};
