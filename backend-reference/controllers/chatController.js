import pool from '../config/db.js';
import { generateAnswer } from '../services/aiService.js';

const HISTORY_LIMIT = 20;

export async function getConversations(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT id, role, content, created_at FROM conversations ORDER BY id ASC'
    );
    res.json({ success: true, data: { conversations: rows } });
  } catch (err) {
    err.source = 'db';
    next(err);
  }
}

async function getById(id) {
  const [rows] = await pool.query(
    'SELECT id, role, content, created_at FROM conversations WHERE id = ?',
    [id]
  );
  return rows[0];
}

export async function createConversation(req, res, next) {
  const question =
    typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  if (!question) {
    return res.status(400).json({
      success: false,
      message: 'The "question" field is required and must be a non-empty string.',
    });
  }
  if (question.length > 4000) {
    return res.status(400).json({
      success: false,
      message: 'The "question" field must be at most 4000 characters.',
    });
  }

  let userId;
  try {
    const [result] = await pool.query(
      'INSERT INTO conversations (role, content) VALUES (?, ?)',
      ['user', question]
    );
    userId = result.insertId;
  } catch (err) {
    err.source = 'db';
    return next(err);
  }

  let answer;
  try {
    const [recent] = await pool.query(
      'SELECT role, content FROM conversations ORDER BY id DESC LIMIT ?',
      [HISTORY_LIMIT]
    );
    answer = await generateAnswer(recent.reverse());
  } catch (err) {
    err.source = 'ai';
    // Don't leave an unanswered question in the history
    await pool.query('DELETE FROM conversations WHERE id = ?', [userId]).catch(() => {});
    return next(err);
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO conversations (role, content) VALUES (?, ?)',
      ['assistant', answer]
    );
    const [userConversation, assistantConversation] = await Promise.all([
      getById(userId),
      getById(result.insertId),
    ]);
    res.status(201).json({
      success: true,
      data: { userConversation, assistantConversation },
    });
  } catch (err) {
    err.source = 'db';
    next(err);
  }
}
