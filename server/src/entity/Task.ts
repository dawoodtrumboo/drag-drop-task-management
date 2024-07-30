import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Priority, TaskStatus } from "../dto";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: "Open" })
  status: TaskStatus;

  @Column({ nullable: true })
  priority: Priority;

  @CreateDateColumn({ name: "deadline" })
  deadline: Date;
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ nullable: true })
  suggestion: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
