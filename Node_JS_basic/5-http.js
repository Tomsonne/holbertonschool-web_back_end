const http = require('http');
const countStudents = require('./3-read_file_async');
const fs = require('fs');

const DB_FILE = process.argv[2]; // nom du fichier passé en argument

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.write('This is the list of our students\n');

    countStudents(DB_FILE)
      .then(() => {
        // countStudents affiche déjà sur la console
        fs.readFile(DB_FILE, 'utf8', (err, data) => {
          if (err) {
            res.end('Cannot load the database');
            return;
          }

          const lines = data.split('\n').filter((line) => line.trim() !== '');
          const students = lines.slice(1);

          res.write(`Number of students: ${students.length}\n`);

          const fields = {};

          for (const line of students) {
            const parts = line.split(',');
            const firstname = parts[0];
            const field = parts[3];

            if (!fields[field]) {
              fields[field] = [];
            }
            fields[field].push(firstname);
          }

          for (const [field, list] of Object.entries(fields)) {
            res.write(
              `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}\n`
            );
          }

          res.end();
        });
      })
      .catch(() => {
        res.end('Cannot load the database');
      });
  } else {
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
