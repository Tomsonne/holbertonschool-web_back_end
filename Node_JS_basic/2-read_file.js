const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);
    console.log(`Number of students: ${students.length}`);
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
      console.log(
        `Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
