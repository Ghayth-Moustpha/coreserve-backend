import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Check if an admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@al-aliaa.com' }, 
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('g$3H9Hal5a', 10); 
    await prisma.user.create({
      data: {
        email: 'admin@al-aliaa.com', // Change to your desired admin email
        password: hashedPassword,
        name: 'Admin',
        role: 'Admin', 
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
