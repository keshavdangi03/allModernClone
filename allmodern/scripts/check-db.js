const { Pool } = require('pg');
const pool = new Pool({ 
  connectionString: 'postgresql://neondb_owner:npg_mi7elKWvxhq9@ep-bitter-leaf-ao1doyw9-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require' 
});

pool.query('SELECT COUNT(*) FROM "Product"')
  .then(r => console.log('Product count:', r.rows[0].count))
  .catch(e => console.error('DB Error:', e.message))
  .finally(() => pool.end());
