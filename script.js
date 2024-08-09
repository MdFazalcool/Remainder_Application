// script.js
document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const day = document.getElementById('day').value;
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;

    // Creating reminder text
    const reminderText = `${day} - ${time} : ${activity}`;

    //  to Add reminder to the list
    const reminderList = document.getElementById('reminderList');
    const newReminder = document.createElement('li');
    newReminder.textContent = reminderText;
    reminderList.appendChild(newReminder);

    // Save reminder in localStorage (optional)
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push({ day, time, activity });
    localStorage.setItem('reminders', JSON.stringify(reminders));

    // Clear the form
    document.getElementById('reminderForm').reset();
});

// Function to check reminders and play sound
function checkReminders() {
    const now = new Date();
    const nowDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    const nowTime = now.toTimeString().substring(0, 5);

    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.forEach(reminder => {
        if (reminder.day === nowDay && reminder.time === nowTime) {
            document.getElementById('chime').play();
            alert(`Time for: ${reminder.activity}`);
        }
    });
}



// Check every minute
setInterval(checkReminders, 60000);
