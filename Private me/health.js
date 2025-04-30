const calendar = document.getElementById('calendar');
const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');

const bloodDates = JSON.parse(localStorage.getItem('periodDates')) || {};

// Fill months and years
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

for (let i = 0; i < 12; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = months[i];
  monthSelect.appendChild(opt);
}

const currentYear = new Date().getFullYear();
for (let i = currentYear - 5; i <= currentYear + 5; i++) {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = i;
  yearSelect.appendChild(opt);
}

monthSelect.value = new Date().getMonth();
yearSelect.value = new Date().getFullYear();

function renderCalendar() {
  calendar.innerHTML = "";
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.textContent = day;

    const key = `${year}-${month}-${day}`;
    if (bloodDates[key]) {
      const blood = document.createElement('div');
      blood.className = 'blood';
      blood.textContent = "🩸";
      dayDiv.appendChild(blood);
    }

    dayDiv.onclick = () => {
      if (bloodDates[key]) {
        delete bloodDates[key];
      } else {
        bloodDates[key] = true;
      }
      localStorage.setItem('periodDates', JSON.stringify(bloodDates));
      renderCalendar();
    };

    calendar.appendChild(dayDiv);
  }
}

monthSelect.onchange = renderCalendar;
yearSelect.onchange = renderCalendar;

window.onload = renderCalendar;
