import "dotenv/config";

// must import adapter for prisma versions 7+
// adapter is required for new prisma versions
// adapter will help to resolve following prisma issue
// PrismaClientInitializationError: `PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({connectionString});
const prisma = new PrismaClient({ adapter });

////////////////////////////

// Sample data (seeding)

async function main() {
  // Seeding users data

  const user1 = await prisma.user.upsert({
    where: { email: "me@example.com" },
    update: {},
    create: {
      email: "me@example.com",
      password: "password123" // plain password only for seeding. in production, must hash password
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: "you@example.com" },
    update: {},
    create: {
      email: "you@example.com",
      password: "password123" // plain password only for seeding. in production, must hash password
    }
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
