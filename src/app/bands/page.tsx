import type { Period } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import { Container } from "@/components";
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
        <h2>Top Artists </h2>
        <span className="font-serif text-primary text-sm tracking-normal font-normal">
          * {convertPeriod(period)} *
        </span>
        <ul className="grid grid-cols-12 gap-5 lg:gap-20">
          {topartists.artist.map((artist, index) => (
            <li key={`${artist.name}-${index}`} className="col-span-12 md:col-span-6 lg:col-span-2">
              <h3>{artist.name}</h3>
              <span className="space-x-2">
                <span className="text-xs text-offset">*</span>
                <span className="text-xs text-offset">{artist.playcount} plays</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
