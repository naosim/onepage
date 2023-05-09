console.log("start", new Date().toLocaleString());

/**
 * 指定した曜日の最後の日を返す
 * @param {Date} date
 * @param {number} day - 曜日。日曜日 = 0
 */
function getLastDay(date, startDay) {
  date = new Date(date); // 破壊防止
  var d = date.getDay();
  if (d < startDay) {
    d += 7;
  }
  date.setDate(date.getDate() - (d - startDay));
  return date;
}

/**
 * 月初を取得する
 * @param {Date} date
 */
function getFirstDayOfMonth(date) {
  date = new Date(date); // 破壊防止
  date.setDate(1); // 1日
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

class Calendar {
  #firstDayOfMonth;
  #year;
  #month;
  #weeks;

  constructor(startDay, date) {
    startDay = startDay === undefined ? 1 : startDay;
    this.#firstDayOfMonth = getFirstDayOfMonth(date || new Date());
    this.#year = this.#firstDayOfMonth.getFullYear();
    this.#month = this.#firstDayOfMonth.getMonth();

    const weeks = [[]];
    var currentDate = getLastDay(this.#firstDayOfMonth, startDay); // 月曜始まり
    var rownum = 0;
    while (currentDate.getMonth() <= this.#month) {
      if (weeks[rownum].length == 7) {
        weeks.push([]);
        rownum++;
      }
      weeks[rownum].push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    while (weeks[rownum].length < 7) {
      weeks[rownum].push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.#weeks = weeks;
  }
  get weeks() {
    return this.#weeks;
  }
}

console.log(new Calendar().weeks);

class Time {
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
