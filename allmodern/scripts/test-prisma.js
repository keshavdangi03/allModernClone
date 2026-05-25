require('dotenv').config({ path: '.env' });
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

prisma.product.findMany({ take: 3, orderBy: { createdAt: 'desc' } })
  .then(r => {
    console.log('OK, products found:', r.length);
    if (r[0]) console.log('First product:', r[0].name, '| price:', r[0].price);
  })
  .catch(e => console.error('ERROR:', e.message, e.stack))
  .finally(() => prisma.$disconnect().then(() => pool.end()));
