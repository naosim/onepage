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

function onlyDate(date) {
  date = new Date(date); // 破壊防止
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

/**
 * 月初を取得する
 * @param {Date} date
 */
function getFirstDayOfMonth(date) {
  date = new Date(date); // 破壊防止
  date.setDate(1); // 1日
  return onlyDate(date);
}

export class Calendar {
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
      const type = currentDate.getMonth() == this.#month ? 'this-month' : 'last-month';
      weeks[rownum].push({type, date: new Date(currentDate)});
      currentDate.setDate(currentDate.getDate() + 1);
    }
    while (weeks[rownum].length < 7) {
      weeks[rownum].push({type: 'next-month', date: new Date(currentDate)});
      currentDate.setDate(currentDate.getDate() + 1);
    }

    this.#weeks = weeks;
  }
  get weeks() {
    return this.#weeks;
  }
}