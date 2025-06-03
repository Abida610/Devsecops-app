const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 5000;
// Enable default metrics
promClient.collectDefaultMetrics();
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});