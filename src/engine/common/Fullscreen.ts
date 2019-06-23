export default class Fullscreen {

  /* View in fullscreen */
  public static openFullscreen():void {
    const elem:any = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } catch(e) {}
  }

  /* View in fullscreen */
  public static closeFullscreen():void {
    const elem:any = document;
    try {
      if (elem.exitFullscreen) {
        elem.exitFullscreen();
      } else if (elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
      } else if (elem.webkitExitFullscreen) {
        elem.webkitExitFullscreen();
      } else if (elem.msExitFullscreen) {
        elem.msExitFullscreen();
      }
    } catch(e) {}
  }

  public static isInFullscreen():boolean {
    const elem:any = document;
    let inFullScreen:boolean = false;
    try {
      inFullScreen = elem.fullscreenElement;
    } catch(e) {}
    return inFullScreen;
  }

}

