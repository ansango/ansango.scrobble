import type { From, Period, To, TopArtists, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import {
  Container,
  Heading,
  Legend,
  LinkExternal,
  LinkYouTube,
  Section,
  Subtitle,
  SubtitleLegend,
  Title,
} from "@/components";
import { convertPeriod, formatDate } from "@/lib";

const {
  userApiMethods: { getTopArtists, getWeeklyArtistChart },
  artistApiMethods: { getSimilar, getInfo },
} = lastFmClient();

const user: UserName = "ansango";
const from: From = (Math.floor(Date.now() / 1000) - 604800).toString();
const to: To = Math.floor(Date.now() / 1000).toString();
const period: Period = "3month";

const getFavArtists = async ({ limit }: { limit: string }) => {
  const { weeklyartistchart } = await getWeeklyArtistChart({ user, from, to });
  const artists = weeklyartistchart.artist.filter(
    (artist) => parseInt(artist["@attr"].rank) <= parseInt(limit)
  );

  return await Promise.all(
    artists.map(({ name }) => {
      return getInfo({ artist: name });
    })
  );
};

const getArtist = async (topartists: TopArtists) => {
  const artists = await Promise.all(
    topartists.artist
      .map(({ name }) => getSimilar({ artist: name, limit: "6" }))
      .map((p) => {
        return p.then((res) => {
          return {
            name: res.similarartists["@attr"].artist,
            similars: res.similarartists.artist,
          };
        });
      })
  );

  return artists;
};

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
        fill="#DA2F47"
        d="M4.042 27.916c4.89.551 9.458-1.625 13.471-5.946c4.812-5.182 5-13 5-14s11.31-3.056 11 5c-.43 11.196-7.43 20.946-19.917 21.916c-5.982.465-9.679-.928-11.387-2.345c-2.69-2.231-.751-4.916 1.833-4.625z"
      ></path>
      <path
        fill="#77B255"
        d="M30.545 6.246c.204-1.644.079-3.754-.747-4.853c-1.111-1.479-4.431-.765-3.569.113c.96.979 2.455 2.254 2.401 4.151c-.044-.01-.085-.022-.13-.032c-3.856-.869-6.721 1.405-7.167 2.958c-.782 2.722 4.065.568 4.68 1.762c1.82 3.53 3.903.155 4.403 1.28s4.097 4.303 4.097.636c0-3.01-1.192-4.903-3.968-6.015z"
      ></path>
    </svg>
  );
};

export default async function Bands() {
  const { topartists } = await getTopArtists({ user, period, limit: "20" });

  const artists = await getArtist(topartists);
  const favArtists = await getFavArtists({ limit: "9" });
  return (
    <>
      <section className="bg-gradient-to-b from-soft to-soft">
        <Container>
          <Section>
            <div className="mx-auto space-y-10 xl:space-y-20 max-w-screen-lg">
              <Title>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                  the obsessions
                </span>
              </Title>
              <SubtitleLegend className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                * {formatDate(new Date(parseInt(from) * 1000))} -{" "}
                {formatDate(new Date(parseInt(to) * 1000))} *
              </SubtitleLegend>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {favArtists.map(({ artist }) => {
                  return (
                    <li
                      key={artist.url}
                      className={`col-span-12 xl:col-span-4 space-y-5 max-w-xs w-full`}
                    >
                      <div>
                        <Subtitle
                          className={`text-default text-2xl lg:text-3xl max-w-xs line-clamp-2`}
                        >
                          {artist.name} <Icon />
                        </Subtitle>

                        <LinkYouTube className="text-offset" query={`${artist.name}`} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Section>
        </Container>
      </section>
      <div className="bg-gradient-to-b from-soft-offset to-soft">
        <Container>
          <Section>
            <div className="space-y-5 max-w-screen-lg mx-auto">
              <Subtitle className="text-primary-dark">
                top artists
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
              <SubtitleLegend className="text-primary-dark">
                * {convertPeriod(period)} *
              </SubtitleLegend>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {topartists.artist.map((artist, index) => {
                  return (
                    <li
                      key={`${artist.name}-${index}`}
                      className={`col-span-12 ${index === 0 ? "" : "md:col-span-6"} `}
                    >
                      <Heading>{artist.name}</Heading>
                      <p className="space-x-2">
                        <Legend>*</Legend>
                        <Legend>{artist.playcount} plays</Legend>
                      </p>
                      <div>
                        <ul className="grid gap-5 grid-cols-12">
                          {artists
                            .filter((a) => a.name === artist.name)[0]
                            .similars.map((similar, index) => {
                              return (
                                <li
                                  key={`${similar.name}-${index}`}
                                  className="col-span-12 sm:col-span-6"
                                >
                                  <LinkExternal
                                    className="highlight text-offset"
                                    href={similar.url}
                                  >
                                    {similar.name}
                                  </LinkExternal>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Section>
        </Container>
      </div>
    </>
  );
}
