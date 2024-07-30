import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/encrypt";
import { LoginDto } from "../dto";
import { validate } from "class-validator";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const loginDto = new LoginDto();
      loginDto.email = req.body.email;
      loginDto.password = req.body.password;

      const errors = (await validate(loginDto))
        .map((error) => Object.values(error.constraints || {}))
        .flat();

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { email: loginDto.email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = encrypt.comparepassword(
        user.password,
        loginDto.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = encrypt.generateToken({ id: user.id });

      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
