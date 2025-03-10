import express, { Application } from "express"
import morgan from "morgan"
import IndexRoutes from "./routers/Index.Routes"
import AccountsRoutes from "./routers/Accounts.Routes"
import TrnsactionRoutes from "./routers/Transaction.Routes"

export class App {
    private app: Application;
    constructor(private PORT?: number) {
        console.log('App constructor')
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/accounts', AccountsRoutes);
        this.app.use('/transactions', TrnsactionRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`Server on port ${this.PORT}`);
    }
}