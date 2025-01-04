import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import GlobalErrorHandler from "./util/GlobalErrorHandler";
import { StatusCodes } from "http-status-codes";
import NoRoutes from "./util/NoRoutes";
import MainRoute from "./routes/Main.routes";
import { message } from "telegraf/filters";
import { Telegraf } from "telegraf";
import "dotenv/config";
import { SettingModel } from "./Setting/Setting.Model";
import NormalBroadcast from "./Broadcast/NormalBroadcast";
import OneMillionBroadcast from "./Broadcast/OneMillionBroadcast";

const app: Application = express();
export const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot?.on(message("text"), async (ctx) => {
    const app_link = await SettingModel.findOne({});
    
    ctx.replyWithPhoto(app_link?.WelcomeBanner as string, {
        caption: app_link?.WelcomeMessage as string,
        reply_markup: {
            inline_keyboard: [
                [{ text: "Open App", url: app_link?.MiniAppLink as string }]
            ]
        }
    })
});

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.json());

app.post('/api/v1/broadcast', NormalBroadcast);
app.post('/api/v1/one-million-broadcast', OneMillionBroadcast);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send('hello world')
    } catch (error) {
        next({
            status: StatusCodes.BAD_REQUEST,
            error
        });
    }
});

app.use("/api/v1", MainRoute);

app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url as string;
    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            return res.status(500).send('Failed to fetch image');
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set('Content-Type', 'image/jpeg'); // Adjust this based on the image type, e.g., 'image/png'
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Failed to fetch image');
    }
});

app.post("/api/bot", async (req, res) => {
    try {
        await bot?.handleUpdate(req.body, res);
    } catch (err) {
        console.error("Error handling update:", err);
        res.status(500).send("Error processing update");
    }
});

app.get("/manifest", async (req, res) => {
    const setting = await SettingModel.findOne({});
    res.send({
        "url": process.env.WEBSITE_URL,
        "name": setting?.ProjectName,
        "iconUrl": process.env.ICON
    });
})

app.use(NoRoutes)

app.use(GlobalErrorHandler)

export default app;