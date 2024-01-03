import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const client = new S3Client({
  credentials: {
    accessKeyId: "AKIAU4FVGQPAJKR7K2YA",
    secretAccessKey: "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",
  },
  region: "us-east-1",
});

const getImageUrl = async (fileKey) => {
  try {
    const command = new GetObjectCommand({
      Bucket: "masnikka",
      Key: fileKey,
      ResponseContentDisposition: "inline", // Optional: Content-Disposition header
      ResponseContentType: "image/jpeg", // Optional: Content-Type header
    });
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return url;
  } catch (err) {
    console.log(err);
  }
};

const S3Image = ({ imgKey, setSelectedImage, style }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Assuming getImageUrl returns a Promise
    getImageUrl(imgKey)
      .then((resolvedUrl) => {
        setImageUrl(resolvedUrl);
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
      });
  }, [imgKey]);

  return imageUrl ? (
    <Box
      component={"img"}
      src={imageUrl}
      alt="product image"
      sx={style}
      onClick={(e) => {
        if (setSelectedImage) {
          setSelectedImage(imgKey);
        }
      }}
    />
  ) : null;
};

export default S3Image;
