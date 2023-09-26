import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { type Express as ExpressNamespace } from "express";
import helmet from "helmet";

import router from "../app/router";
import {
    ApiPrefix,
    Cors,
    Port,
    RootDir,
    UserUploadedContentPath,
} from "../env";
import morganMiddleware from "../middlewares/morgan";

const Express = (): {
    app: ExpressNamespace;
    initializeApp: () => void;
    configureViews: () => void;
} => {
    const app = express();

    const initializeApp = (): void => {
        let corsOrigins: string | string[] = Cors;
        corsOrigins = corsOrigins !== "" ? corsOrigins.split(",") : "*";

        app.use(
            cors({
                origin: corsOrigins,
                methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
            })
        );
        app.use(express.json());
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        app.use(express.static(RootDir + "/public"));
        app.use(
            UserUploadedContentPath,
            express.static(RootDir + "/storage/uploads/")
        );
        app.use(helmet());
        app.use(compression());
        app.disable("x-powered-by");

        app.set("port", Port);
    };

    const configureViews = (): void => {
        app.use(`${ApiPrefix}`, morganMiddleware, router);
    };

    return {
        app,
        initializeApp,
        configureViews,
    };
};

export default Express;
