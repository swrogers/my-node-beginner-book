const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable");

const start = response => {
  console.log("Request handler for start was called");

  const body = `
    <html>
      <head>
        <meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
      </head>
      <body>
        <form action="/upload" enctype="multipart/form-data" method="post">
          <input type="file" name="upload"/>
          <input type="submit" value="Upload file"/>
        </form>
      </body>
    </html>
  `;

  response.writeHead(200, { "Content-type": "text/html" });
  response.write(body);
  response.end();
};

const upload = (response, request) => {
  console.log("Request handler for upload was called");

  const form = new formidable.IncomingForm();
  form.uploadDir = "../tmp";
  console.log("about to parse");
  form.parse(request, (err, fields, files) => {
    console.log("parsing done");

    fs.rename(files.upload.path, "tmp/test.png", error => {
      if (error) {
        fs.unlinkSync("tmp/test.png");
        fs.rename(files.upload.path, "tmp/test.png");
      }
    });

    response.writeHead(200, { "Content-type": "text/html" });
    response.write("received image: <br/>");
    response.write("<img src='/show' />");
    response.end();
  });
};

const show = response => {
  console.log("Request handler show was called");
  response.writeHead(200, { "Content-type": "image/png" });
  fs.createReadStream("tmp/test.png").pipe(response);
};

exports.start = start;
exports.upload = upload;
exports.show = show;
