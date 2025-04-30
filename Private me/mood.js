const calendar = document.getElementById('calendar');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const emojiPicker = document.getElementById('emojiPicker');
let selectedDay = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let moods = {};

function init() {
  generateMonthOptions();
  generateYearOptions();
  loadCalendar(currentYear, currentMonth);

  monthSelect.addEventListener("change", () => {
    currentMonth = parseInt(monthSelect.value);
    loadCalendar(currentYear, currentMonth);
  });

  yearSelect.addEventListener("change", () => {
    currentYear = parseInt(yearSelect.value);
    loadCalendar(currentYear, currentMonth);
  });
}

function generateMonthOptions() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthNames.forEach((month, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = month;
    if (i === currentMonth) option.selected = true;
    monthSelect.appendChild(option);
  });
}

function generateYearOptions() {
  const startYear = 2020;
  const endYear = 2035;
  for (let y = startYear; y <= endYear; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    if (y === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }
}

function loadCalendar(year, month) {
  calendar.innerHTML = '';
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const storageKey = `${year}-${month}`;
  moods = JSON.parse(localStorage.getItem(storageKey) || "{}");

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayBox = document.createElement('div');
    dayBox.className = 'day';
    dayBox.setAttribute('data-day', day);

    const dateLabel = document.createElement('div');
    dateLabel.className = 'date';
    dateLabel.textContent = day;
    dayBox.appendChild(dateLabel);

    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = moods[day] || '';
    dayBox.appendChild(emoji);

    dayBox.onclick = (e) => {
      selectedDay = day;
      showEmojiPicker(e.clientX, e.clientY);
    };

    calendar.appendChild(dayBox);
  }
}

function showEmojiPicker(x, y) {
  emojiPicker.style.display = 'flex';
  emojiPicker.style.position = 'fixed';
  emojiPicker.style.left = `${x}px`;
  emojiPicker.style.top = `${y}px`;
}

function selectMood(moodEmoji) {
  const emojiDiv = document.querySelector(`.day[data-day='${selectedDay}'] .emoji`);
  emojiDiv.textContent = moodEmoji;
  moods[selectedDay] = moodEmoji;
  const storageKey = `${currentYear}-${currentMonth}`;
  localStorage.setItem(storageKey, JSON.stringify(moods));
  emojiPicker.style.display = 'none';
}

document.addEventListener("click", (e) => {
  if (!emojiPicker.contains(e.target) && !e.target.closest(".day")) {
    emojiPicker.style.display = 'none';
  }
});

init();
