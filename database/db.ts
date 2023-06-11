import mongoose from "mongoose";
// conexion a traves de mongoose a nuestra database.

const mongoConnection = {
  isConected: 0,
};

export const connect = async () => {
  if (mongoConnection.isConected) {
    console.log("conectado");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConected = mongoose.connections[0].readyState;

    if (mongoConnection.isConected === 1) {
      console.log("usando conexion anterior");
      return;
    }
    await disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConnection.isConected = 1;
  console.log("conectado a mdb, URL", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongoConnection.isConected === 0) return;
  await mongoose.disconnect();
  console.log("DESCONECTADO DE DB");
};
