export default {
  PORT: process.env.PORT,
  JWT_SECRET: "mysecrettoken",
  // MONGO
  MONGO_URI: `mongodb+srv://mgUser:1234qwer@cluster0.wpnir.gcp.mongodb.net/course?retryWrites=true&w=majority`,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD
}