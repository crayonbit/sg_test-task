export default class Fullscreen {

  /* View in fullscreen */
  public static openFullscreen():void {
    const elem:any = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
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
      } else if (elem.mozCancelFullScreen) { /* Firefox */
        elem.mozCancelFullScreen();
      } else if (elem.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitExitFullscreen();
      } else if (elem.msExitFullscreen) { /* IE/Edge */
        elem.msExitFullscreen();
      }
    } catch(e) {}
  }

  public static isInFullscreen():boolean {
    const elem:any = document;
    return elem.fullscreenElement;
  }

}

