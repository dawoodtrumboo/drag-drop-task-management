import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers";
import { SignupDto, UserResponse } from "../dto/user.dto";
import { validate } from "class-validator";

export class UserController {
  static async signup(req: Request, res: Response) {
    try {
      console.log(req.body);
      const signupDto = new SignupDto();
      signupDto.name = req.body.name;
      signupDto.email = req.body.email;
      signupDto.password = req.body.password;

      const errors = (await validate(signupDto))
        .map((error) => Object.values(error.constraints || {}))
        .flat();

      if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const userRepository = AppDataSource.getRepository(User);

      const hashedPassword = await encrypt.encryptpass(signupDto.password);
      const user = userRepository.create({
        ...signupDto,
        password: hashedPassword,
      });
      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });

      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
