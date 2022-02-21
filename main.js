const calendar = document.querySelector(".calendar-body");

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

daysOfWeek.forEach(dayOfWeek => {
  calendar.insertAdjacentHTML("beforeend", `<div class='calendar-day-of-week'>${dayOfWeek}</div>`)
});

for (let day = 1; day <= 31; day++) {
  calendar.insertAdjacentHTML("beforeend", `<div class='calendar-day'>${day}</div>`)
}