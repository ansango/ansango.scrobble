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

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.5em"
      height="0.5em"
      viewBox="0 0 36 36"
      className="inline-flex ml-2"
    >
      <path
        fill="#DD2E44"
        d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"
      />
    </svg>
  );
};

const {
  userApiMethods: { getTopTracks, getLovedTracks, getWeeklyTrackChart },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "10";
const period: Period = "3month";
const from: From = (Math.floor(Date.now() / 1000) - 604800).toString();
const to: To = Math.floor(Date.now() / 1000).toString();

const getFavTracks = async ({ limit }: { limit: string }) => {
  const {
    weeklytrackchart: { track },
  } = await getWeeklyTrackChart({ user, from, to });
  return track.filter((track) => parseInt(track["@attr"].rank) <= parseInt(limit));
};

export const revalidate = 604800;

export default async function Tracks() {
  const { toptracks } = await getTopTracks({ user, period, limit });
  const { lovedtracks } = await getLovedTracks({ user, limit });
  const favTracks = await getFavTracks({ limit: "7" });

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
              <SubtitleLegend className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                * {formatDate(new Date(parseInt(from) * 1000))} -{" "}
                {formatDate(new Date(parseInt(to) * 1000))} *
              </SubtitleLegend>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {favTracks.map((track, i) => {
                  return (
                    <li
                      key={track.url}
                      className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
                    >
                      <Subtitle className="text-default text-2xl lg:text-3xl max-w-screen-sm">
                        {track.name}

                        {favTracks.map((track, i) => {
                          if (i < 3) {
                            return <Icon key={track.url} />;
                          }
                        })}
                      </Subtitle>
                      <Heading className="font-sans text-offset lowercase text-lg xl:text-xl">
                        {track.artist["#text"]}{" "}
                      </Heading>
                      <LinkYouTube
                        query={`${track.name} ${track.artist["#text"]}`}
                        className="text-offset"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Section>
        </Container>
      </section>
      <section className="bg-gradient-to-b from-alternative-offset via-alternative-offset to-soft-offset">
        <Container>
          <Section>
            <div className="space-y-5 max-w-screen-lg mx-auto">
              <Subtitle className="text-secondary-dark">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-dark">
                  Top Tracks
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="inline-flex ml-2 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
                    <path
                      fill="currentColor"
                      d="M12 2a8 8 0 0 1 5 14.245v4.61a1.1 1.1 0 0 1-1.486 1.03L12 20.569l-3.514 1.318A1.1 1.1 0 0 1 7 20.856v-4.61A8 8 0 0 1 12 2Zm3 15.419A7.978 7.978 0 0 1 12 18a7.978 7.978 0 0 1-3-.581v2.138l2.298-.862a2 2 0 0 1 1.404 0l2.298.862v-2.138ZM12 4a6 6 0 1 0 0 12a6 6 0 0 0 0-12Zm0 2a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"
                    ></path>
                  </g>
                </svg>
              </Subtitle>
              <SubtitleLegend className="text-secondary">
                * {convertPeriod(period)} *
              </SubtitleLegend>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {toptracks.track.map((track, i) => (
                  <li
                    key={track.url}
                    className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
                  >
                    <Heading className="text-secondary">{track.name}</Heading>

                    <p className="space-x-2">
                      <span className="italic font-bold">{track.artist.name}</span>
                      <Legend>*</Legend>
                      <Legend>{track.playcount} plays</Legend>
                    </p>
                    <LinkYouTube
                      className="text-secondary"
                      query={`${track.name}${" "}${track.artist.name}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        </Container>
      </section>
      <section className="bg-gradient-to-b from-soft-offset via-soft-offset to-soft-offset">
        <Container>
          <Section>
            <div className="space-y-5 max-w-screen-lg mx-auto">
              <Subtitle className="text-primary-dark">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                  Loved Tracks
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="inline-flex ml-2 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12"
                >
                  <g fill="none">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
                    <path
                      fill="currentColor"
                      d="M18.494 3.801c2.095 1.221 3.569 3.7 3.504 6.592C21.86 16.5 13.5 21 12 21s-9.861-4.5-9.998-10.607c-.065-2.892 1.409-5.37 3.504-6.592C7.466 2.66 9.928 2.653 12 4.338c2.072-1.685 4.534-1.679 6.494-.537Z"
                    ></path>
                  </g>
                </svg>
              </Subtitle>
              <SubtitleLegend className="primary">* last added *</SubtitleLegend>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {lovedtracks.track.map((track, i) => (
                  <li
                    key={track.url}
                    className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
                  >
                    <Heading className="text-primary">{track.name}</Heading>
                    <p className="space-x-2">
                      <LegendItalicBold>{track.artist.name}</LegendItalicBold>
                      <Legend> {track.date && <>*</>}</Legend>
                      <Legend>{formatDate(track.date["#text"] as unknown as Date, "en-US")}</Legend>
                    </p>
                    <LinkYouTube
                      className="text-primary"
                      query={`${track.name}${" "}${track.artist.name}`}
                    />
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
