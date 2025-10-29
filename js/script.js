(function () {
    const targetDate = new Date('2028-07-14T18:00:00');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function pad(n) { return String(n).padStart(2, '0'); }

    function update() {
        const now = new Date();
        let diff = targetDate - now;
        if (diff < 0) diff = 0;

        const s = Math.floor(diff / 1000);
        const days = Math.floor(s / (24 * 3600));
        const hours = Math.floor((s % (24 * 3600)) / 3600);
        const minutes = Math.floor((s % 3600) / 60);
        const seconds = s % 60;

        daysEl.textContent = days;
        hoursEl.textContent = pad(hours);
        minutesEl.textContent = pad(minutes);
        secondsEl.textContent = pad(seconds);
    }
    update();
    setInterval(update, 1000);
})();

