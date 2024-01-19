import { fabric } from "fabric";
var canvas = new fabric.Canvas("myCanvas");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

const bucketName = "masnikka";

const client = new S3Client({
  credentials: {
    accessKeyId: "AKIAU4FVGQPAJKR7K2YA",
    secretAccessKey: "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",
  },
  region: "us-east-1",
});

const saveDesign = async (key, json, size) => {
  return new Promise((resolve, reject) => {
    canvas.loadFromJSON(json, async function () {
      canvas.setWidth(size.width); // Set the width to the loaded canvas width
      canvas.setHeight(size.height); // Set the height to the loaded canvas height
      const dataURL = canvas.toDataURL({ format: "png", quality: 1 });

      const file = {
        filename: key,
        path: Buffer.from(dataURL.split(",")[1], "base64"),
      };

      const command = new PutObjectCommand({
        Bucket: "masnikka",
        Key: `masnikka-designs/${file.filename}`,
        Body: file.path,
      });

      try {
        const response = await client.send(command);
        resolve(`masnikka-designs/${key}`);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
};

export default saveDesign;
