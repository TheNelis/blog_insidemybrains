export default async function handler(req, res) {
  // 1. Optioneel: check dat het een POST request is
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  // 2. Wacht 5 seconden zodat Sanity data kan opslaan
  await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    // 3. Trigger de Vercel deployment
    const vercelResponse = await fetch(
      "https://api.vercel.com/v1/integrations/deploy/prj_gYoBPYiphoPlGeXL4E3pt2m7LYbk/ND71Mi8nKQ",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer ${process.env.VERCEL_TOKEN}",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!vercelResponse.ok) {
      throw new Error(`Vercel API error: ${vercelResponse.statusText}`);
    }

    res.status(200).json({ message: "Triggered Vercel build after delay" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
