import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/progress", (req: Request, res: Response) => {
  res.on("error", console.error)
  if (req.url === "/progress") {
    sseSetup(res)
    sseProgress(res)
    
  } else {
    res.end("Hello")
  }
  
});

function sseSetup(res: Response) {
  console.log("sse request received")
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "connection": "keep-alive",
    "cache-control": "no-cache",
    "access-control-allow-origin": "*"
  })
}

function sseProgress(res: Response, progress: number = 0) {
  const newProgress = Math.min(progress + Math.random() * 10, 100)
  res.write("event: progress\n")
  res.write(`id: id_${newProgress}\n`)
  res.write(`data: ${Math.floor(newProgress)}% complete\n\n`)
  if(newProgress >= 100) {
    //res.end()
    res.write("event: done\n")
    res.write("data: 100% complete\n\n")
  } else {
    setTimeout(() => sseProgress(res, newProgress), 1000)
  }
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});