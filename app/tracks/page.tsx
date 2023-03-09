import type { Limit, Period, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import {
  Subtitle,
  SubtitleLegend,
  Heading,
  Legend,
  LegendItalicBold,
  LinkYouTube,
  Section,
} from "@/components";
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
    <>
      <Section>
        <div className="space-y-5 max-w-screen-lg mx-auto">
          <Subtitle>Top Tracks</Subtitle>
          <SubtitleLegend>* {convertPeriod(period)} *</SubtitleLegend>
          <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
            {toptracks.track.map((track, i) => (
              <li
                key={track.url}
                className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
              >
                <Heading>
                  {track.name}
                  <LinkYouTube query={`${track.name}${" "}${track.artist.name}`} />
                </Heading>

                <p className="space-x-2">
                  <span className="italic font-bold">{track.artist.name}</span>
                  <Legend>*</Legend>
                  <Legend>{track.playcount} plays</Legend>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section>
        <div className="space-y-5 max-w-screen-lg mx-auto">
          <Subtitle>Loved Tracks</Subtitle>
          <SubtitleLegend>* last added *</SubtitleLegend>
          <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
            {lovedtracks.track.map((track, i) => (
              <li
                key={track.url}
                className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
              >
                <Heading>
                  {track.name}
                  <LinkYouTube query={`${track.name}${" "}${track.artist.name}`} />
                </Heading>
                <p className="space-x-2">
                  <LegendItalicBold>{track.artist.name}</LegendItalicBold>
                  <Legend> {track.date && <>*</>}</Legend>
                  <Legend>{formatDate(track.date["#text"] as unknown as Date, "en-US")}</Legend>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
