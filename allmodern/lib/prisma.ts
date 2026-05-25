import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var _prismaPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var _prismaClient: PrismaClient | undefined;
}

function getPrisma(): PrismaClient {
  if (global._prismaClient) {
    return global._prismaClient;
  }

  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_mi7elKWvxhq9@ep-bitter-leaf-ao1doyw9-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

  if (!global._prismaPool) {
    global._prismaPool = new Pool({ connectionString, max: 5 });
  }

  const adapter = new PrismaPg(global._prismaPool);
  global._prismaClient = new PrismaClient({ adapter });
  return global._prismaClient;
}

export const prisma = getPrisma();
