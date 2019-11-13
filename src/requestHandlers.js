const start = () => {
  console.log("Request handler for start was called");
};

const upload = () => {
  console.log("Request handler for upload was called");
};

exports.start = start;
exports.upload = upload;
