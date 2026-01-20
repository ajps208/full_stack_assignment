// node-cron for scheduling jobs
import cron from "node-cron";
import Record from "../models/Record.js";
import { sendBatch } from "../services/externalApi.js";

// Run every 2 hours to process pending and failed records
cron.schedule("0 */2 * * *", async () => {
  console.log("Running batch job...");

  //   Get pending and failed records
  const records = await Record.find({
    status: { $in: ["PENDING", "FAILED"] },
  }).limit(10);

  if (!records.length) return;

  const payload = records.map((r) => ({
    id: r?.uid,
    name: r?.name,
    email: r?.email,
    phoneNumber: r?.phoneNumber,
    link: r?.link,
    dob: r?.dob,
  }));

  //   Send batch
  const response = await sendBatch(payload);

  //   Update records
  for (const r of response) {
    await Record.updateOne({ uid: r?.id }, { status: r?.status });
  }
});
