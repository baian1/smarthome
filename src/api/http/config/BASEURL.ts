if (process.env.NODE_ENV === 'production') {
  module.exports = "https://smarthome.fogmonth.xyz";
} else {
  module.exports = "http://localhost:8080/api";
}