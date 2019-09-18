// function autoPlayMusic(isPlay, id) {
//   // 自动播放音乐效果，解决浏览器或者APP自动播放问题
//   function musicInBrowserHandler() {
//     musicPlay(isPlay, id);
//     document.body.removeEventListener('touchstart', musicInBrowserHandler);
//   }
//   document.body.addEventListener('touchstart', musicInBrowserHandler);
//
//   // 自动播放音乐效果，解决微信自动播放问题
//   function musicInWeixinHandler() {
//     musicPlay(isPlay, id);
//     document.addEventListener("WeixinJSBridgeReady", function () {
//       musicPlay(isPlay, id);
//     }, false);
//     document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
//   }
//   document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
// }
//
// function musicPlay(isPlay, id) {
//   var media = document.getElementById(id);
//   if (isPlay && media.paused) {
//     media.load();
//     media.play();
//   }
//   if (!isPlay && !media.paused) {
//     media.pause();
//   }
// }
//
// export default {
//   autoPlayMusic
// }