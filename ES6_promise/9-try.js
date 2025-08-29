export default function guardrail(mathFunction) {
  const queue = [];
  try {
    queue.push(result);
  } catch (err) {
    queue.push(`Error: ${err.message}`);
  } finally {
    queue.push('Guardrail was processed');
  }
  return queue;
}
