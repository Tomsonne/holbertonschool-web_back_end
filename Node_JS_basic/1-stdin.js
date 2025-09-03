process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (data) => {
  const name = data;
  process.stdout.write(`Your name is: ${name}`);
  process.exit(0);
});

process.on('exit', () => {
  console.log('This important software is now closing');
});
