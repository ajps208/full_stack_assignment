import axios from "axios";

// Send batch to external API
export const sendBatch = async (payload) => {
  const res = await axios.post(
    "https://dev.micro.mgsigma.net/batch/process",
    payload
  );
  return res?.data;
};
