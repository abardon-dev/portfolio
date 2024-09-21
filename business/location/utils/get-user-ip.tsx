"use server";

import { headers } from "next/headers";

export async function getUserIp() {
  let ip = headers().get("x-forwarded-for");

  // Use hardcoded IP for development
  if (process.env.NODE_ENV === "development") {
    ip = "8.8.8.8";
  }

  return ip;
}
