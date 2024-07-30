import * as express from "express";
import { Request, Response } from "express";
import { UserController, AuthController } from "../controllers";
import * as passport from "passport";
import { User } from "../entity/User";
const Router = express.Router();

Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
Router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req: Request, res: Response) => {
    const user = req.user as { user: User; token: string };

    if (user) {
      res.json(user);
    } else {
      res.redirect("/auth");
    }
  }
);
// Router.get("/google/failure", isLoggedIn, (req, res) => {
//   res.send("Something went wrong!");
// });

// Router.get("/protected", isLoggedIn, (req, res) => {
//   let name = req.user.displayName;
//   res.send(`Hello ${name}`);
// });

export { Router as userRouter };
