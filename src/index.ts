import express from 'express'
import AnalyzeRoutes from './routes/analyze.route.js'
import ProfileRoutes from './routes/profile.route.js'
import { rateLimit } from 'express-rate-limit'

const app = express()

const PORT = 3000;

// 1. Configure the Rate Limiter Middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  limit: 60, 
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: 'draft-7', 
  legacyHeaders: false, 
})

app.use(limiter)

app.use("/api/analyze", AnalyzeRoutes)
app.use("/api/profiles", ProfileRoutes)

app.use((req,res,err) => {
  console.log(err)
  return res.status(500).json({ message: "Internal Server Error" })
})


export default app;