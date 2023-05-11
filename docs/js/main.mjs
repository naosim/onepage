import {Calendar} from "./calendar.mjs"
console.log("start", new Date().toLocaleString());


const calendar = new Calendar();
var text = calendar.weeks
  .map(row => row.map(v => `<td class="${v.type}">${v.date.getDate()}</td>`).join(''))
  .map(row => `<tr>${row}</tr>`).join('\n')
console.log(text);

document.querySelector("div#calendar").innerHTML = `<table><tr><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th><th>日</th></tr>${text}</table>`

const updateTime = (() => {
  const div = document.querySelector("#time");
  var lastText = null;
  return () => {
    const date = new Date();
    const text = date.toLocaleTimeString().split(':').slice(0, 2).join(':');
    if(text != lastText) {
      div.innerText = lastText = text;
    }
  }
})();
updateTime();
setInterval(updateTime, 1000);

document.querySelector("#date").innerText = new Date().toLocaleDateString();