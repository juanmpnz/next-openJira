import Cookies from "js-cookie";

export const setCookie = (cookieName: string, cookieValue: string) => {
  Cookies.set(cookieName, cookieValue);
};

export const getCookie = (cookieName: string) => Cookies.get(cookieName);

export const removeCookie = (cookieName: string) => Cookies.remove(cookieName);
