export class Time {
  #hours;
  #minutes;
  constructor(hours, minutes) {
    this.setTime(hours, minutes);
  }
  get hours() {
    return this.#hours;
  }

  get minutes() {
    return this.#minutes;
  }

  get hoursText() {
    return `0${this.#hours}`.slice(-2);
  }

  get minutesText() {
    return `0${this.#minutes}`.slice(-2);
  }

  setTime(hours, minutes) {
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }

    if (hours >= 24) {
      hours = h % 24;
    }
    if (hours < 0) {
      hours += 24;
    }

    this.#hours = hours;
    this.#minutes = minutes;
  }

  addTime(hours, minutes) {
    this.setTime(this.#hours + hours, this.#minutes + minutes);
  }

  addHours(hours) {
    this.addTime(hours, 0);
  }

  addMinutes(minutes) {
    this.addTime(0, minutes);
  }
}