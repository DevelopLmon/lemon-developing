import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:D:/developing/lemon-developing/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "mountainvrp@gmail.com" },
    update: {},
    create: {
      email: "mountainvrp@gmail.com",
      password,
      name: "Leon",
      role: "ADMIN",
    },
  });

  console.log("✅ Admin-Account erstellt:", admin.email);
  console.log("📧 E-Mail: mountainvrp@gmail.com");
  console.log("🔑 Passwort: admin123");
  console.log("⚠️  Bitte Passwort nach dem ersten Login ändern!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
