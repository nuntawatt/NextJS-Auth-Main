import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from "typeorm";

@Entity()
@Unique(["email"]) 
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 150, nullable: true })
  name?: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password?: string | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  provider?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  providerId?: string | null;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
