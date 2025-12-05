import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";

declare global {
  var __appDataSource: any;
}

const defaultDb = process.env.TYPEORM_DATABASE || "./data/sqlite.db";

function createSqliteDataSource() {
  return new DataSource({
    type: "sqlite",
    database: defaultDb,
    entities: [User],
    synchronize: true,
    logging: false,
  });
}

function createPostgresDataSource() {
  return new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User],
    synchronize: true,
    logging: false,
  } as any);
}

if (!global.__appDataSource) {
  global.__appDataSource = process.env.DATABASE_URL ? createPostgresDataSource() : createSqliteDataSource();
}

export const AppDataSource: DataSource = global.__appDataSource;

export async function initDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    try {
      const opts: any = AppDataSource.options as any;
    } catch {}
  }
  return AppDataSource;
}
