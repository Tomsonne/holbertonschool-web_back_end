import express from 'express';
import { promises as fs } from 'fs';

export const app = express();

async function readDatabase(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length <= 1) {
      return { total: 0, byField: {} };
    }

    const header = lines[0].split(',');
    const idxFirst = header.indexOf('firstname') !== -1 ? header.indexOf('firstname')
                    : header.indexOf('firstName') !== -1 ? header.indexOf('firstName')
                    : 0;
    const idxField  = header.indexOf('field') !== -1 ? header.indexOf('field') : header.length - 1;

    const byField = {};
    let total = 0;

    for (let i = 1; i < lines.length; i += 1) {
      const row = lines[i].split(',');
      if (row.length < Math.max(idxFirst, idxField) + 1) continue;

      const firstName = row[idxFirst]?.trim();
      const field = row[idxField]?.trim();

      if (!firstName || !field) continue;

      if (!byField[field]) byField[field] = [];
      byField[field].push(firstName);
      total += 1;
    }

    return { total, byField };
  } catch (err) {
    const e = new Error('Cannot load the database');
    e.cause = err;
    throw e;
  }
}

app.get('/', (_req, res) => {
  res.type('text/plain').send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');

  const dbPath = process.argv[2];
  const header = 'This is the list of our students';

  if (!dbPath) {
    res.send(`${header}\nCannot load the database`);
    return;
    }

  try {
    const { total, byField } = await readDatabase(dbPath);

    const lines = [`${header}`, `Number of students: ${total}`];

    const fields = Object.keys(byField).sort();

    fields.forEach((f) => {
      const list = byField[f] || [];
      lines.push(`Number of students in ${f}: ${list.length}. List: ${list.join(', ')}`);
    });

    res.send(lines.join('\n'));
  } catch (err) {
    res.send(`${header}\nCannot load the database`);
  }
});

if (process.argv[1] && process.argv[1].includes('7-http_express.js')) {
  const PORT = 1245;
  app.listen(PORT, () => {});
}

export default app;
