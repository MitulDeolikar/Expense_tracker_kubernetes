const pool = require('./config/db');

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  }
})();
