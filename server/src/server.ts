import mongoose from "mongoose";
import app, { bot } from "./app";
import "dotenv/config";

async function main() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const port = process.env.PORT || 3000;
    
    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`);
        const webhookUrl = `https://${process.env.SERVER_URL}/api/bot`;
        try {
            // await bot?.launch(); 

            await bot.telegram.setWebhook(webhookUrl);// for production
            console.log(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook?url=https://${process.env.SERVER_URL}/api/bot`);
            
        } catch (err) {
            console.error("Error setting webhook:", err);
        }
    });

}


main();