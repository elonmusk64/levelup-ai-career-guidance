const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, xp_level, test_completed',
        [name, email, hashedPassword]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT id, name, email, xp_level, profile_image, test_completed, career_options FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateTestCompletion(userId, careerOptions) {
    try {
      const result = await pool.query(
        'UPDATE users SET test_completed = TRUE, career_options = $1, xp_level = xp_level + 100 WHERE id = $2 RETURNING *',
        [JSON.stringify(careerOptions), userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateXP(userId, xpGain) {
    try {
      const result = await pool.query(
        'UPDATE users SET xp_level = xp_level + $1 WHERE id = $2 RETURNING xp_level',
        [xpGain, userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
