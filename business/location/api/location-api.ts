export const getUserCountry = async (ip: string): Promise<string | null> =>
  await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`)
    .then((res) => res.json())
    .then((data) => data.country || null);
