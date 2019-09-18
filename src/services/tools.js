function loadScript (obj, url) {
  return new Promise((resolve, reject) => {
    if (obj) {
      resolve();
      return;
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) { // IE
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else { // Others
      script.onload = function() {
        resolve();
      };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}



function parseQuery (url = window.location.href) {
  return (url.match(/([^?=&]+)=([^&#]*)/g) || []).reduce((a, v) => (
    a[v.split('=')[0]]=decodeURIComponent(v.split('=')[1]),a),{}
  );
}

function parseString(obj = {}) {
  let arr = Object.keys(obj).map(item => {
    return `${item}=${encodeURIComponent(obj[item])}`;
  });
  return arr.join('&');
}


export default {
  loadScript,
  parseQuery,
  parseString,
}