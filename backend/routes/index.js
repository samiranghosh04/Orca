import express from "express"
import postRouter from "./postRoutes.js"
import userRouter from "./userRoutes.js"

const router = express.Router()

// this file would register all the routes that would follow the convention
//  /api/x 
// for every ```router.use(x, handler)```


router.use("/users", userRouter)
router.use("/posts", postRouter)

export default router