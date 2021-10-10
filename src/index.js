import refs from './js/refs.js';

const COUNT_DELAY = 1000;
const { startBtn, pauseBtn, stopBtn } = refs;

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = null;
    this.timerId = null;
    this.isCounting = false;
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
    if (!this.isCounting) {
      this.isCounting = true;
      this.timerId = setInterval(() => {
        const deltaTime = this.targetDate - Date.now();
        const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);

        this.insertValues(days, hours, mins, secs);
      }, COUNT_DELAY);
    }
  }

  insertValues(days, hours, mins, secs) {
    this.refs.daysSpan.textContent = this.pad(days);
    this.refs.hoursSpan.textContent = this.pad(hours);
    this.refs.minsSpan.textContent = this.pad(mins);
    this.refs.secsSpan.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  pauseCount() {
    clearInterval(this.timerId);
    this.isCounting = false;
  }

  stopCount() {
    clearInterval(this.timerId);
    this.insertValues(0, 0, 0, 0);
    this.isCounting = false;
  }
}

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 7, 2022'),
});

timer1.startCount();

startBtn.addEventListener('click', timer1.startCount.bind(timer1));
pauseBtn.addEventListener('click', timer1.pauseCount.bind(timer1));
stopBtn.addEventListener('click', timer1.stopCount.bind(timer1));
