import type { Period } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import { Container, Heading, Legend, Subtitle, SubtitleLegend } from "@/components";
import { convertPeriod } from "@/lib";

const {
  userApiMethods: { getTopArtists },
} = lastFmClient();

const period: Period = "6month";

export default async function Bands() {
  const { topartists } = await getTopArtists({ user: "ansango", period, limit: "20" });
  return (
    <Container className="grid grid-cols-12">
      <section className="col-span-12 space-y-5">
        <Subtitle>top artists </Subtitle>
        <SubtitleLegend>* {convertPeriod(period)} *</SubtitleLegend>
        <ul className="grid grid-cols-12 gap-5 lg:gap-20">
          {topartists.artist.map((artist, index) => (
            <li key={`${artist.name}-${index}`} className="col-span-12 md:col-span-6 lg:col-span-2">
              <Heading>{artist.name}</Heading>
              <p className="space-x-2">
                <Legend>*</Legend>
                <Legend>{artist.playcount} plays</Legend>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
