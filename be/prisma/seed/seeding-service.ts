import { PrismaClient } from "@prisma/client";
import { menuSeeder } from "./seeder/menu.seeder";

const prisma = new PrismaClient();

async function main() {
  // Seeding Proccess

  // PHASE 1
  await Promise.all([
    prisma.menu.createMany({ data: menuSeeder, skipDuplicates: true}),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });