import type { Limit, Period, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import {
  Heading,
  Legend,
  LegendItalicBold,
  LinkYouTube,
  Section,
  Subtitle,
  SubtitleLegend,
} from "@/components";
import { convertPeriod } from "@/lib";

const {
  userApiMethods: { getTopAlbums },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "20";
const period: Period = "12month";

const topAlbums = async () => await getTopAlbums({ user, period, limit });

export default async function Albums() {
  const { topalbums } = await topAlbums();
  return (
    <Section>
      <div className="space-y-5 max-w-screen-lg mx-auto">
        <Subtitle>Top Albums</Subtitle>
        <SubtitleLegend>* {convertPeriod(period)} *</SubtitleLegend>
        <ul className="grid grid-cols-12 gap-5 lg:gap-10">
          {topalbums.album.map((album, index) => {
            return (
              <li
                key={`${album.name}-${index}`}
                className="col-span-12 md:col-span-6 xl:col-span-4"
              >
                <Heading>
                  {album.name}
                  <LinkYouTube query={`${album.name}${" "}${album.artist.name}`} />
                </Heading>

                <p className="space-x-2">
                  <LegendItalicBold>{album.artist.name}</LegendItalicBold>
                  <Legend>*</Legend>
                  <Legend>{album.playcount} plays</Legend>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
