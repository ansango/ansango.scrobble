import type { RecentTracks } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";
import type { NextApiRequest, NextApiResponse } from "next";

const {
  userApiMethods: { getRecentTracks },
} = lastFmClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecentTracks>) {
  const { recenttracks } = await getRecentTracks(
    { user: "ansango", limit: "5" },
    { cache: "no-cache", next: { revalidate: 10 } }
  );
  return res.status(200).json(recenttracks);
}
