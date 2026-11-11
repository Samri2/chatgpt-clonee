export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found.' });
}

export function errorHandler(err, req, res, next) {
  console.error(`[${err.source || 'server'}]`, err.message);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON body.' });
  }
  if (err.source === 'ai') {
    return res.status(502).json({
      success: false,
      message: 'The AI provider failed to generate a response. Please try again.',
    });
  }
  if (err.source === 'db') {
    return res.status(500).json({
      success: false,
      message: 'A database error occurred. Please try again later.',
    });
  }

  res.status(500).json({ success: false, message: 'Internal server error.' });
}

