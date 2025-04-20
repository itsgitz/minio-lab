import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

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

    const rl = createInterface({ input, output });
    const bucketName = await rl.question("What is your bucket name? ");

    console.log("Creating bucket: ", bucketName);

    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint,
    });
    const command = new CreateBucketCommand({
      Bucket: bucketName,
    });

    const response = await client.send(command);
    console.log("Bucket created: ", response);

    rl.close();
  } catch (e) {
    console.error(e);
  }
}

main();
