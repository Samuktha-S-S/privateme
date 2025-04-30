// Elements
const todayDate = document.getElementById('todayDate');
const diaryInput = document.getElementById('diaryInput');
const saveBtn = document.getElementById('saveBtn');
const entriesList = document.getElementById('entriesList');

// Storage key
const STORAGE_KEY = 'personalDiaryEntries';

// Show today's date
function formatDate(d) {
  return d.toLocaleDateString('default', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}
todayDate.textContent = formatDate(new Date());

// Load & render entries
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  entriesList.innerHTML = '<h2>Your Past Entries</h2>';
  entries.reverse().forEach(entry => {
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.innerHTML = `
      <div class="entry-date">${formatDate(new Date(entry.timestamp))}</div>
      <div class="entry-text">${entry.text}</div>
    `;
    entriesList.appendChild(card);
  });
}

// Save a new entry
saveBtn.addEventListener('click', () => {
  const text = diaryInput.value.trim();
  if (!text) return alert('Write something before saving! 💖');
  
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  entries.push({ text, timestamp: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  
  diaryInput.value = '';
  loadEntries();
});

// Initial render
loadEntries();
