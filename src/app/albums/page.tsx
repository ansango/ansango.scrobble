import type { Limit, Period, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import {
  Container,
  Heading,
  Legend,
  LegendItalicBold,
  LinkYouTube,
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
    <Container className="grid grid-cols-12">
      <section className="col-span-12 space-y-5">
        <Subtitle>Top Albums</Subtitle>
        <SubtitleLegend>* {convertPeriod(period)} *</SubtitleLegend>
        <ul className="grid grid-cols-12 gap-5 lg:gap-20">
          {topalbums.album.map((album, index) => {
            return (
              <li
                key={`${album.name}-${index}`}
                className="col-span-12 md:col-span-6 lg:col-span-4"
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
      </section>
    </Container>
  );
}
