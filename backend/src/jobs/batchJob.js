// node-cron for scheduling jobs
import cron from "node-cron";
import Record from "../models/Record.js";
import { sendBatch } from "../services/externalApi.js";
import { formatDOB } from "../helpers/helpers.js";

// Run every 2 hours to process pending and failed records
cron.schedule("0 */2 * * *", async () => {
  console.log("Running batch job...");

  //   Get pending and failed records
  const records = await Record.find({
    status: { $in: ["PENDING", "FAILED"] },
  }).limit(10);

  if (!records.length) return;

  const payload = records.map((r) => ({
    id: r.uid,
    name: r.name,
    email: r.email,
    phoneNumber: r.phoneNumber,
    ...(r.link && { link: r.link }),
    ...(r.dob && { dob: formatDOB(r.dob) }),
  }));

  // console.log(payload, "payload");

  //   Send batch
  const response = await sendBatch(payload);

  // console.log(response, "response");

  //   Update records
  for (const r of response) {
    await Record.updateOne({ uid: r?.id }, { status: r?.status });
  }
});
