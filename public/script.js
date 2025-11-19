document.getElementById('regForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const course = document.getElementById('course').value.trim();
  const roll = document.getElementById('roll').value.trim();
  const msgEl = document.getElementById('msg');

  msgEl.innerText = 'Submitting...';

  try {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, course, roll })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed');

    msgEl.innerText = 'Registered successfully!';
    e.target.reset();
  } catch (err) {
    msgEl.innerText = 'Error: ' + (err.message || 'Failed to register');
  }
});
