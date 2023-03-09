import { lastFmClient } from "lastfm-client-ts";

import {
  Title,
  Subtitle,
  SubtitleLegend,
  Legend,
  LegendItalicBold,
  Heading,
  LinkYouTube,
  ActiveBullet,
  LinkExternal,
  Section,
} from "@/components";
import { formatDate } from "@/lib";

const {
  userApiMethods: { getInfo, getRecentTracks },
} = lastFmClient();

export const revalidate = 10;

export default async function Home() {
  const { recenttracks } = await getRecentTracks(
    { user: "ansango", limit: "5" },
    { cache: "no-cache", next: { revalidate: 10 } }
  );

  const { user } = await getInfo({ user: "ansango" });

  return (
    <>
      <Section className="text-center">
        <div className="pb-10 lg:pb-20">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 rounded-full">
            <span className="w-10 h-10">🎵</span>
          </div>
          <Title>
            The Playlist <br className="hidden lg:block" />
            All-Time Favorite Tunes
          </Title>

          <p className="max-w-xl mx-auto mt-8 text-center text-offset">
            Explore my collection and embark on a sonic journey, experiencing a curated selection of
            amazing tracks.
          </p>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col max-w-screen-lg mx-auto text-left">
          <div className="w-full mx-auto space-y-5">
            <h2>What tha hell is this?</h2>
            <h3>
              <LinkExternal href={user.url} className="cursor-pointer font-medium">
                {user.realname}
              </LinkExternal>
            </h3>
            <p className="text-offset">
              This is a selection of my favorite songs, carefully curated over the years. Since
              2007, I have been recording my listening habits on Last.fm, although unfortunately I
              lost my previous account and had to start over.
            </p>
            <p className="text-offset">
              Now I&apos;m on my second account and have been recording my music since 2018. To
              date, I&apos;ve listened to a total of{" "}
              <span className="font-bold">{user.playcount} songs</span>, and my library contains{" "}
              <span className="font-bold">{user.track_count} tracks</span>,{" "}
              <span className="font-bold">{user.album_count} albums</span>, and{" "}
              <span className="font-bold">{user.artist_count} artists</span>.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="space-y-5 max-w-screen-lg mx-auto">
          <Subtitle>Recent Tracks</Subtitle>
          <SubtitleLegend>* last played *</SubtitleLegend>
          <ul className="space-y-5">
            {recenttracks.track.filter((track) => track.date === undefined).length > 0 && (
              <li>
                <Heading>
                  {recenttracks.track
                    .filter((track) => track.date === undefined)
                    .map((track) => (
                      <>
                        {track.name}
                        <LinkYouTube query={`${track.name} ${" "}${track.artist["#text"]}`} />
                      </>
                    ))}
                </Heading>
                <p className="space-x-2">
                  <LegendItalicBold>
                    {recenttracks.track
                      .filter((track) => track.date === undefined)
                      .map((track) => track.artist["#text"])}
                  </LegendItalicBold>
                  <Legend>*</Legend>
                  <Legend className="relative">
                    now
                    <ActiveBullet />
                  </Legend>
                </p>
              </li>
            )}
            {recenttracks.track
              .filter((track) => track.date !== undefined)
              .map((track, index) => {
                return (
                  <li key={`${track.url}-${index}`}>
                    <Heading>
                      {track.name}
                      <LinkYouTube query={`${track.name} ${" "}${track.artist["#text"]}`} />
                    </Heading>
                    <p className="space-x-2">
                      <LegendItalicBold> {track.artist["#text"]}</LegendItalicBold>
                      <Legend>{track.date && <>*</>}</Legend>
                      <Legend>{formatDate(track.date["#text"] as unknown as Date, "en-US")}</Legend>
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </Section>
    </>
  );
}
