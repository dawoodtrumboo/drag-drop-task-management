import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import * as passport from "passport";
import { encrypt } from "../../helpers";
import { SignupDto } from "../../dto";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
    passReqToCallback: true,
  },
  async function (req, actionToken, refreshToken, profile, done) {
    const userRepository = AppDataSource.getRepository(User);

    try {
      let createdUser = await userRepository.findOne({
        where: { googleId: profile.id },
      });

      if (!createdUser) {
        const signupDto = new SignupDto();
        signupDto.name = profile.displayName;
        signupDto.email = profile.emails[0].value;
        signupDto.password = profile.emails[0].value;
        console.log(signupDto);
        const hashedPassword = await encrypt.encryptpass(signupDto.password);
        createdUser = userRepository.create({
          googleId: profile.id,
          password: hashedPassword,
          ...signupDto,
        });

        await userRepository.save(createdUser);
      }

      const token = encrypt.generateToken({ id: createdUser.id });
      const { password: _, ...user } = createdUser;
      return done(null, { user, token });
    } catch (error) {
      console.error("OAuth error:", error);
      return done(error, null);
    }
  }
);
passport.use(googleStrategy);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default googleStrategy;
