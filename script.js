document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  const toggleBtn = document.getElementById('toggleBtn');
  const input = document.getElementById('itemInput');
  const list = document.getElementById('items');

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.textContent = text;
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    remove.style.marginLeft = '12px';
    remove.addEventListener('click', () => li.remove());
    li.appendChild(remove);
    list.prepend(li);
    input.value = '';
    input.focus();
  });

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  // allow Enter to add
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });
});