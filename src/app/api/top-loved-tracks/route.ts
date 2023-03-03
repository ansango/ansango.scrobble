import LastFmApi from "@/lib/lastfm";

const lastFm = LastFmApi();
const { config, method } = lastFm;

export async function GET(request: Request) {
  const data = await lastFm.getLovedTracks(
    method.user.loved_tracks,
    config.username,
    "overall",
    "200"
  );
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
