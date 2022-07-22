import express, { NextFunction, Request, Response } from 'express';
import { config as envConf } from 'dotenv';
import { app, httpServer, server } from './interface/server-apollo';
import mongoInit from './interface/db';
import { UserController } from './interface/controllers/UserController';
import { MongoUserRepository } from './interface/repositories/mongo/MongoUserRepository';
import { UserService } from './interface/services/UserService';
import { userRouter } from './interface/routes/user.routes';
import { teamRouter } from './interface/routes/team.routes';
import { incomeRouter } from './interface/routes/income.routes';
import { errorResponse } from './application/helpers/errorResponse.utils';
import { sendResponse } from './application/helpers/responseBuilder.utils';

envConf(); // loading .env file to process.env

const PORT = process.env.PORT || 4000;
const empty = () => {};

const main = async () => {
  try {
    // DB
    // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ie-app.2ntae.mongodb.net/?retryWrites=true&w=majority`;
    const uri = `mongodb://localhost:27017/ieApp`;
    await mongoInit(uri);

    // await server.start();
    // server.applyMiddleware({ app });

    // Now that our HTTP server is fully set up, we can listen to it.
    // httpServer.listen(PORT, () => {
    //   console.log(`🚀 Server is now running on http://localhost:${PORT}${server.graphqlPath}`);
    // });

    const app = express();
    const userRepository = new MongoUserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.use(express.json());
    app.use('/users', userRouter);
    app.use('/teams', teamRouter);
    app.use('/incomes', incomeRouter);
    app.get('/', (req, res) => res.send('working fine'));

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      if (error) {
        const response = errorResponse(error);
        sendResponse(res, response);
      }
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server is now running on http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error(err.message);
    console.log(err.stackTrace);
  }
};

main();
