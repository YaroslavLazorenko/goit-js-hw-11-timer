const COUNT_DELAY = 1000;

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = null;
    this.timerId = null;
  }

  getRefs() {
    this.refs = {
      daysSpan: document.querySelector(`${this.selector} span[data-value="days"]`),
      hoursSpan: document.querySelector(`${this.selector} span[data-value="hours"]`),
      minsSpan: document.querySelector(`${this.selector} span[data-value="mins"]`),
      secsSpan: document.querySelector(`${this.selector} span[data-value="secs"]`),
    };
  }

  startCount() {
    this.getRefs();
    this.timerId = setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);
      this.insertValues(days, hours, mins, secs);
    }, COUNT_DELAY);
  }

  insertValues(days, hours, mins, secs) {
    this.refs.daysSpan.textContent = days;
    this.refs.hoursSpan.textContent = hours;
    this.refs.minsSpan.textContent = mins;
    this.refs.secsSpan.textContent = secs;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 7, 2022'),
});

//timer.getRefs();
timer.startCount();
