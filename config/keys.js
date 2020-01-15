const pass = process.env.MONGO_PASSWORD;
module.exports = {

  mongoURI: `mongodb+srv://admin:${pass}@cluster0-ghuqu.mongodb.net/test?retryWrites=true&w=majority`

}