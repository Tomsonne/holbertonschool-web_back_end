const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;

async function loadStudents(dbFile) {
  try {
    const fileContent = await fs.readFile(dbFile, 'utf8');
    const rows = fileContent.trim().split('\n');
    const headers = rows[0].split(',');

    const studentList = [];

    for (let i = 1; i < rows.length; i += 1) {
      const values = rows[i].split(',');
      const student = {};
      headers.forEach((header, index) => {
        student[header] = values[index];
      });
      studentList.push(student);
    }

    let output = `Number of students: ${studentList.length}\n`;

    const csList = studentList.filter((stud) => stud.field === 'CS');
    const csNames = csList.map((stud) => stud.firstname);
    output += `Number of students in CS: ${csList.length}. List: ${csNames.join(', ')}\n`;

    const sweList = studentList.filter((stud) => stud.field === 'SWE');
    const sweNames = sweList.map((stud) => stud.firstname);
    output += `Number of students in SWE: ${sweList.length}. List: ${sweNames.join(', ')}`;

    return output;
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (_, res) => {
  res.type('text/plain');
  res.status(200).send('Hello Holberton School!');
});

app.get('/students', async (_, res) => {
  const introMsg = 'This is the list of our students\n';
  try {
    const result = await loadStudents('database.csv');
    res.type('text/plain');
    res.status(200).send(`${introMsg}${result}`);
  } catch (err) {
    res.type('text/plain');
    res.status(200).send(introMsg + err.message);
  }
});

app.use((_, res) => {
  res.type('text/plain');
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});

module.exports = app;
