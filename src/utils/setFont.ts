export const setFont = (key: string, path: string, setLoading: Function) => {
  let style = document.createElement("style");
  // let url = `http://192.168.0.133:8000/2016-08-15/proxy/YD_VIP/app/api/${path}?key=${key}`;
  // let url = `http://vip-api.yidengxuetang.cn/api/${path}?key=${key}`;
  // let url = `http://localhost:8000/2016-08-15/proxy/YD_VIP/app/api/${path}?key=${key}&st=${Date.now()}`;
  let url = `https://vip-api.yidengfe.com/api/${path}?key=${key}&st=${Date.now()}`;
  style.innerText = `@font-face {font-family:'custom';src:url(${encodeURI(
    url
  )}) format('woff') }`;
  document.querySelector("head").appendChild(style);
  (document as any).fonts.ready.then(function () {
    setLoading(false);
  });
};
