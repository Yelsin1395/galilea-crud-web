import { fromFetch } from "rxjs/fetch";

class ApiProvider {
  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_BASE_URL;
  }

  isAbsoluteUrl(url) {
    const path = /^https?:\/\//i;
    return path.test(url);
  }

  getUrl(url) {
    if (this.isAbsoluteUrl(url)) return url;
    return `${this.baseUrl}${url}`;
  }

  get(url, headers) {
    return fromFetch(this.getUrl(url), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  post(url, body, headers) {
    return fromFetch(this.getUrl(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  put(url, body, headers) {
    return fromFetch(this.getUrl(url), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  patch(url, body, headers) {
    return fromFetch(this.getUrl(url), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }

  delete(url, headers) {
    return fromFetch(this.getUrl(url), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }
}

export const http = new ApiProvider();
