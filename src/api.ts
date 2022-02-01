import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/v1/",
  timeout: 10000,
  headers: { "content-type": "application/json" },
});
export function testAlert(): Promise<any> {
  return instance.get("alert/test");
}

export function saveAlert(
  message: string,
  frequency: string,
  emailRecipients: string[]
): Promise<any> {
  return instance.post("alert/save", { message, frequency, emailRecipients });
}
