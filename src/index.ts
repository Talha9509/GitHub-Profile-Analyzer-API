import express from 'express'
import AnalyzeRoutes from './routes/analyze.route.js'
import ProfileRoutes from './routes/profile.route.js'

const app = express()

const PORT = 3000;

app.use("/api/analyze", AnalyzeRoutes)
app.use("/api/profiles", ProfileRoutes)

app.use((req,res,err) => {
  console.log(err)
  return res.status(500).json({ message: "Internal Server Error" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});