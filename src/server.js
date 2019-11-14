const http = require("http");
const url = require("url");

const start = (route, handle) => {
  const onRequest = (request, response) => {
    let postData = "";
    const pathname = url.parse(request.url).pathname;
    console.log(`Request for ${pathname} received.`);

    request.setEncoding("utf8");

    request.addListener("data", postChunkData => {
      postData += postChunkData;
      console.log(`Received POST chunk data: ${postChunkData}`);
    });

    request.addListener("end", () => {
      route(handle, pathname, response, postData);
    });
  };

  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
};

exports.start = start;
