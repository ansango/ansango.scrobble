import type { Period } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import { Heading, Legend, Section, Subtitle, SubtitleLegend } from "@/components";
import { convertPeriod } from "@/lib";

const {
  userApiMethods: { getTopArtists },
} = lastFmClient();

const period: Period = "6month";

export default async function Bands() {
  const { topartists } = await getTopArtists({ user: "ansango", period, limit: "20" });
  return (
    <Section>
      <div className="space-y-5 max-w-screen-lg mx-auto">
        <Subtitle>top artists </Subtitle>
        <SubtitleLegend>* {convertPeriod(period)} *</SubtitleLegend>
        <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
          {topartists.artist.map((artist, index) => {
            return (
              <li
                key={`${artist.name}-${index}`}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Heading>{artist.name}</Heading>
                <p className="space-x-2">
                  <Legend>*</Legend>
                  <Legend>{artist.playcount} plays</Legend>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
