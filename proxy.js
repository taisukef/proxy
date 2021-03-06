import { createApp, handleJSON, getHeaders } from "https://code4sabae.github.io/js/servestutil.js";
//import { createApp, handleJSON, getHeaders } from "../../code4sabae-js/servestutil.js";

const app = createApp();

app.handle("/proxy/", async (req) => {
  await handleJSON(req, async (path, json) => {
    if (json == null) {
      return null;
    }
    const url = json.url;
    if (!url) {
      return null;
    }
    try {
      const res = await fetch(url);
      const body = await res.text();
      return { url, status: res.status, headers: getHeaders(res.headers), body };
    } catch (e) {
      return null;
    }
  }, "https://fukuno.jig.jp");
});

app.listen({ port: 8007, hostname: "::" });
