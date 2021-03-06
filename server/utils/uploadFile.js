var AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

async function uploadFileToAws(file) {
  const fileName = `${new Date().getTime()}_${file.name}`;
  const mimetype = file.mimetype;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file.data,
    ContentType: mimetype,
    ACL: "public-read",
  };
  const res = await new Promise((resolve, reject) => {
    s3.upload(params, (err, data) =>
      err == null ? resolve(data) : reject(err)
    );
  });
  return { fileUrl: res.Location };
}

module.exports = {
  uploadFileToAws,
};
