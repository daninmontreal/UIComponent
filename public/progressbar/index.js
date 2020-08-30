
let e = document.getElementsByClassName("progress")[0];

let t = setInterval(()=>{
  const style = getComputedStyle(e);
  const width = parseFloat(style.getPropertyValue("--width")) || 0;
  e.style.setProperty("--width", width+.1);
  if(width > 100) {
    clearInterval(t);
    e.setAttribute("data-label", "Finished");
  }
}, 5);

