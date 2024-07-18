import express, { Router } from 'express';
interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private port: number;
  private routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    // middlewares
    this.app.use(express.json()); // raw
    //this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
      console.log(`http://localhost:${this.port}`);
    });
  }
}
