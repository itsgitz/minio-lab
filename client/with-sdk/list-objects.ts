import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";

async function main() {
  try {
    if (!process.env.AWS_ENDPOINT) throw new Error("AWS_ENDPOINT is not set");
    if (!process.env.AWS_ACCESS_KEY_ID)
      throw new Error("AWS_ACCESS_KEY_ID is not set");

    if (!process.env.AWS_SECRET_ACCESS_KEY)
      throw new Error("AWS_SECRET_ACCESS_KEY is not set");

    const endpoint = process.env.AWS_ENDPOINT;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint,
    });
    const command = new ListObjectsV2Command({
      Bucket: "desmond-bucket",
    });
    const response = await client.send(command);

    console.log("List objects: ", response);
  } catch (e) {
    console.error(e);
  }
}

main();
