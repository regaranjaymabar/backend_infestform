import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoute"
import categoryRoute from "./routes/categoryRoute"
import pembicaraRoute from "./routes/pembicaraRoute";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("ini adalah ambadist");
});

app.use("/events", eventRoutes)
app.use("/category", categoryRoute)
app.use("/pembicara", pembicaraRoute)

app.listen(port, () =>{
    console.log(`server is running on http://localhost:3000:$(port)`)
} )