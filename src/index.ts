import mongoose from "mongoose"
import app from "./server"

const PORT = process.env.PORT || 3001

mongoose.set("returnOriginal", false)
mongoose
  .connect(process.env.ATLAS_URL!)
  .then(() => app.listen(PORT, () => console.log("Server running on port " + PORT)))
  .catch(err => {
    console.log("db error", err)
    process.exit(1)
  })
