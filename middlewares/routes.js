const staticRouter = require('../routes/static');
const bikeRouter = require('../routes/bike');
const rentalSpotRouter = require('../routes/rentalSpot');
const authRouter = require('../routes/auth');
const userRouter = require('../routes/user');

module.exports = exports = function(app) {
  app.use(staticRouter);
  app.use('/api/bike',bikeRouter);
  app.use('/api/rentalspot',rentalSpotRouter);
  app.use('/api/auth',authRouter);
  app.use('/api/user',userRouter);
}