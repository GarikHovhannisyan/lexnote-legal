const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const SUPPORTED_LANGS = ['en', 'ru', 'es', 'fr', 'de', 'pt', 'zh', 'tr'];

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Root — landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// /privacy → default English
app.get('/privacy', (req, res) => {
  res.redirect('/privacy/en');
});

// /privacy/:lang
app.get('/privacy/:lang', (req, res) => {
  const lang = SUPPORTED_LANGS.includes(req.params.lang) ? req.params.lang : 'en';
  res.sendFile(path.join(__dirname, 'views', 'privacy', `${lang}.html`));
});

// /terms → default English
app.get('/terms', (req, res) => {
  res.redirect('/terms/en');
});

// /terms/:lang
app.get('/terms/:lang', (req, res) => {
  const lang = SUPPORTED_LANGS.includes(req.params.lang) ? req.params.lang : 'en';
  res.sendFile(path.join(__dirname, 'views', 'terms', `${lang}.html`));
});

// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`LexNote legal pages running on port ${PORT}`);
});
