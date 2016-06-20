export default function goBackBrowswerDetect (destination) {
  // if statement checks if the browser is safari
  // using go(-2) for safari instead of go(-1) because it hangs
  // browser detection suggestion --> http://bit.ly/28Jw6Nu
  if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
    destination(-2);
  } else {
    destination(-1);
  }
}
