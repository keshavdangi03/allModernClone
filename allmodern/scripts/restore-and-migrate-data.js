require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

// 1. Connection strings
const oldDbConnectionString = 'postgresql://neondb_owner:npg_mi7elKWvxhq9@ep-bitter-leaf-ao1doyw9-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const newDbConnectionString = process.env.DATABASE_URL;

console.log('Restoring and migrating users...');
console.log('Old Database:', oldDbConnectionString);
console.log('New Database:', newDbConnectionString);

if (!newDbConnectionString) {
  console.error('DATABASE_URL env variable is not set!');
  process.exit(1);
}

async function run() {
  // 2. Fetch users from the old database
  const oldPool = new Pool({ connectionString: oldDbConnectionString });
  let oldUsers = [];
  try {
    const res = await oldPool.query('SELECT * FROM "User"');
    oldUsers = res.rows;
    console.log(`Successfully fetched ${oldUsers.length} users from the old database.`);
  } catch (error) {
    console.error('Error fetching users from the old database:', error.message);
    oldPool.end();
    process.exit(1);
  } finally {
    await oldPool.end();
  }

  // 3. Connect to the new database
  const newPool = new Pool({ connectionString: newDbConnectionString });
  const adapter = new PrismaPg(newPool);
  const prisma = new PrismaClient({ adapter });

  try {
    for (const oldUser of oldUsers) {
      // Map old database roles ('VIEWER', 'ADMIN', etc.) to schema-supported roles ('user', 'admin')
      let mappedRole = 'user';
      const emailLower = oldUser.email.toLowerCase().trim();
      
      if (oldUser.role === 'ADMIN' || oldUser.role === 'admin' || emailLower === 'admin@admin.np' || emailLower === 'admin@example.com') {
        mappedRole = 'admin';
      }

      console.log(`Migrating user: ${oldUser.email} with role: ${mappedRole}`);

      await prisma.user.upsert({
        where: { email: emailLower },
        update: {
          password: oldUser.password,
          role: mappedRole,
          createdAt: oldUser.createdAt,
          updatedAt: oldUser.updatedAt,
        },
        create: {
          id: oldUser.id,
          email: emailLower,
          password: oldUser.password,
          role: mappedRole,
          createdAt: oldUser.createdAt,
          updatedAt: oldUser.updatedAt,
        }
      });
    }

    console.log('User migration completed successfully!');
  } catch (error) {
    console.error('Error migrating users to the new database:', error.message, error.stack);
  } finally {
    await prisma.$disconnect();
    await newPool.end();
  }
}

run();
