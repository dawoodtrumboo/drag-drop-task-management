import * as passport from "passport";
import googleStrategy from "./google/googleStrategy";

import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

class AuthService {
  constructor() {
    this.initialize();
  }

  private initialize() {
    passport.use(googleStrategy);

    passport.serializeUser((user: User, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id } });
      done(null, user);
    });
  }

  public googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
  });

  public googleCallback = passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  });

  public linkedinAuth = passport.authenticate("linkedin");

  public linkedinCallback = passport.authenticate("linkedin", {
    failureRedirect: "/login",
    failureMessage: true,
  });
}

export default new AuthService();
