import type { Limit, Period, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import { Container, LinkExternal } from "@/components";
import { YTMusic } from "@/components/icons";
import { convertPeriod, formatDate } from "@/lib";

const {
  userApiMethods: { getTopTracks, getLovedTracks },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "10";
const period: Period = "3month";

export default async function Tracks() {
  const { toptracks } = await getTopTracks({ user, period, limit });
  const { lovedtracks } = await getLovedTracks({ user, limit });
  return (
    <Container className="grid grid-cols-12 gap-y-20 lg:gap-x-10">
      <section className="col-span-12 lg:col-span-6 space-y-5 xl:space-y-12">
        <h2>Top Tracks</h2>
        <span className="font-serif text-primary text-sm tracking-normal font-normal">
          * {convertPeriod(period)} *
        </span>
        <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
          {toptracks.track.map((track, i) => (
            <li
              key={track.url}
              className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
            >
              <h3>
                {track.name}
                <LinkExternal
                  href={`https://music.youtube.com/search?q=${track.name}${" "}${
                    track.artist.name
                  }`}
                  className="inline-block ml-2"
                >
                  <YTMusic />
                </LinkExternal>
              </h3>

              <p className="space-x-2">
                <span className="italic font-bold">{track.artist.name}</span>
                <span className="text-xs text-offset">*</span>
                <span className="text-xs text-offset">{track.playcount} plays</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="col-span-12 lg:col-span-6 space-y-5 xl:space-y-12">
        <h2>Loved Tracks</h2>
        <span className="font-serif text-primary text-sm tracking-normal font-normal">
          * last added *
        </span>
        <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
          {lovedtracks.track.map((track, i) => (
            <li
              key={track.url}
              className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
            >
              <h3>
                {track.name}
                <LinkExternal
                  href={`https://music.youtube.com/search?q=${track.name}${" "}${
                    track.artist.name
                  }`}
                  className="inline-block ml-2"
                >
                  <YTMusic />
                </LinkExternal>
              </h3>
              <p className="space-x-2">
                <span className="italic font-semibold">{track.artist.name}</span>
                <span className="text-xs text-offset"> {track.date && <>*</>}</span>
                <span className="text-xs text-offset">
                  {formatDate(track.date["#text"] as unknown as Date, "en-US")}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
