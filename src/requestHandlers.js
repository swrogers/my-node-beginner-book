const querystring = require("querystring");

const start = (response, postData) => {
  console.log("Request handler for start was called");

  const body = `
    <html>
      <head>
        <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
      </head>
      <body>
        <form action="/upload" method="post">
          <textarea name="text" rows="20" cols="60"></textarea>
          <input type="submit" value="Submit text"/>
        </form>
      </body>
    </html>
  `;

  response.writeHead(200, { "Content-type": "text/html" });
  response.write(body);
  response.end();
};

const upload = (response, postData) => {
  console.log("Request handler for upload was called");
  response.writeHead(200, { "Content-type": "text/plain" });
  response.write(`You've sent: ${querystring.parse(postData).text}`);
  response.end();
};

exports.start = start;
exports.upload = upload;
