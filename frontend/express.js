import express from "express"

const app = express()
const port = 3000

app.use(express.static("dist"))

app.use((req, res, next) => {
   res.redirect("/")
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
