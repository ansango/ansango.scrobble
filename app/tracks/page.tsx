import type { From, Limit, Period, To, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import {
  Subtitle,
  SubtitleLegend,
  Heading,
  Legend,
  LegendItalicBold,
  LinkYouTube,
  Section,
  Container,
  Title,
} from "@/components";
import { convertPeriod, formatDate } from "@/lib";

const {
  userApiMethods: { getTopTracks, getLovedTracks, getWeeklyTrackChart },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "10";
const period: Period = "3month";

const from: From = (Math.floor(Date.now() / 1000) - 604800).toString();
const to: To = Math.floor(Date.now() / 1000).toString();

const getFavTracks = async ({ limit }: { limit: string }) => {
  const { weeklytrackchart } = await getWeeklyTrackChart({ user, from, to });
  return weeklytrackchart.track.filter((track) => parseInt(track["@attr"].rank) <= parseInt(limit));
};

export default async function Tracks() {
  const { toptracks } = await getTopTracks({ user, period, limit });
  const { lovedtracks } = await getLovedTracks({ user, limit });
  const favTracks = await getFavTracks({ limit: "3" });
  return (
    <>
      <section className="bg-gradient-to-b from-soft to-soft">
        <Container>
          <Section>
            <div className="max-w-screen-lg mx-auto space-y-5 lg:space-y-10">
              <Title>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                  new fav tracks
                </span>
              </Title>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {favTracks.map((track, i) => (
                  <li
                    key={track.url}
                    className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
                  >
                    <Subtitle className="text-default">{track.name}</Subtitle>
                    <Heading className="font-sans text-offset lowercase">
                      {track.artist["#text"]}
                    </Heading>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </Container>
      </section>
      <section className="bg-gradient-to-b from-soft via-soft to-alternative-offset">
        <Container>
          <Section>
            <div className="space-y-5 max-w-screen-lg mx-auto">
              <Subtitle className="text-primary-dark">Top Tracks</Subtitle>
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
        </Container>
      </section>
      <section className="bg-gradient-to-b from-alternative-offset via-alternative-offset to-soft">
        <Container>
          <Section>
            <div className="space-y-5 max-w-screen-lg mx-auto">
              <Subtitle className="text-secondary">Loved Tracks</Subtitle>
              <SubtitleLegend className="text-secondary">* last added *</SubtitleLegend>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {lovedtracks.track.map((track, i) => (
                  <li
                    key={track.url}
                    className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
                  >
                    <Heading className="text-secondary">
                      {track.name}
                      <LinkYouTube
                        className="text-secondary hover:!text-secondary"
                        query={`${track.name}${" "}${track.artist.name}`}
                      />
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
        </Container>
      </section>
    </>
  );
}
