/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/https";
import express from "express";
import cors from "cors";
import authRouter from "./api/routes/auth.router";
import taskRouter from "./api/routes/tasks.router";
import { registerErrorHandlers } from "./api/middlewares/error.handler";

setGlobalOptions({ maxInstances: 10 });

const app = express();

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Hello from Firebase express!");
});

app.use("/auth", authRouter);
app.use('/tasks', taskRouter);

registerErrorHandlers(app);

export const api = onRequest(app);
