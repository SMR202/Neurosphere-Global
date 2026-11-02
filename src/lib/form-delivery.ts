import { z } from "zod";
import { deliveryConfiguration } from "./enquiry-delivery";

export function formDeliveryConfiguration() {
  const key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (key && z.uuid().safeParse(key).success)
    return { provider: "web3forms" as const, accessKey: key };
  const webhook = deliveryConfiguration();
  return webhook ? { provider: "webhook" as const, ...webhook } : null;
}
