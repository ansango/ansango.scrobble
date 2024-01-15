import type { From, Limit, Period, To, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";
import Image from "next/image";
import Link from "next/link";

import {
  Container,
  Heading,
  Legend,
  LegendItalicBold,
  LinkYouTube,
  Section,
  Subtitle,
  SubtitleLegend,
  Title,
} from "@/components";
import { convertPeriod, formatDate } from "@/lib";

const {
  userApiMethods: { getTopAlbums, getWeeklyAlbumChart },
  albumApiMethods: { getInfo: getAlbumInfo },
  artistApiMethods: { getInfo: getArtistInfo },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "20";
const period: Period = "12month";
const from: From = (Math.floor(Date.now() / 1000) - 604800).toString();
const to: To = Math.floor(Date.now() / 1000).toString();

const getTags = async ({ artist }: { artist: string }) => {
  return getArtistInfo({ artist }).then(
    ({
      artist: {
        tags: { tag },
      },
    }) => {
      return tag;
    }
  );
};

const getFavAlbums = async ({ limit }: { limit: string }) => {
  const {
    weeklyalbumchart: { album },
  } = await getWeeklyAlbumChart({ user, from, to });
  const albums = album.filter((album) => parseInt(album["@attr"].rank) <= parseInt(limit));

  const favs = await Promise.all(
    albums.map(({ artist, name }) => {
      return getAlbumInfo({ album: name, artist: artist["#text"] }).then(
        ({ album: { name, artist, image, url } }) => {
          return {
            name,
            artist,
            image,
            url,
          };
        }
      );
    })
  );
  return await Promise.all(
    favs.map(async (album) => {
      const tags = await getTags({ artist: album.artist });
      return {
        ...album,
        tags,
      };
    })
  );
};

export const revalidate = 604800;

const getPopulatedTopAlbums = async () => {
  const { topalbums } = await getTopAlbums({ user, period, limit });
  const albums = topalbums.album;

  const populatedAlbums = await Promise.all(
    albums.map(({ artist, name, playcount }) => {
      return getAlbumInfo({ album: name, artist: artist.name }).then(
        ({ album: { name, artist, image, url } }) => {
          return {
            name,
            artist,
            image,
            url,
            playcount,
          };
        }
      );
    })
  );
  return await Promise.all(
    populatedAlbums.map(async (album) => {
      const tags = await getTags({ artist: album.artist });
      return {
        ...album,
        tags,
      };
    })
  );
};

export default async function Albums() {
  const topalbums = await getPopulatedTopAlbums();
  const favAlbums = await getFavAlbums({ limit: "4" });

  return (
    <>
      <section className="bg-gradient-to-b from-soft to-soft">
        <Container>
          <Section>
            <div className="mx-auto space-y-10 xl:space-y-20">
              <div className="mx-auto max-w-screen-lg">
                <Title>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                    weekly records
                  </span>
                </Title>
                <SubtitleLegend className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                  * {formatDate(new Date(parseInt(from) * 1000))} -{" "}
                  {formatDate(new Date(parseInt(to) * 1000))} *
                </SubtitleLegend>
              </div>

              <div className="relative mx-auto max-w-7xl">
                <ul className="grid gap-12 mx-auto mt-12 sm:grid-cols-2  xl:grid-cols-4 lg:max-w-none">
                  {favAlbums.map((album) => {
                    return (
                      <li className="flex flex-col mb-12 overflow-hidden" key={album.url}>
                        <Link href={`/`}>
                          <div className="flex-shrink-0 relative">
                            <Image
                              className="rounded-sm opacity-80 w-full"
                              src={album.image[3]["#text"]}
                              alt={album.name}
                              width={300}
                              height={300}
                            />
                            <div className="bg-gradient-to-r from-transparent via-soft-offset to-transparent absolute bottom-2 left-2 flex gap-2 rounded-md py-0.5 px-1.5 hover:border-primary-light border-2 border-transparent hover:bg-primary">
                              <LinkYouTube
                                className="text-offset"
                                query={`${album.name} ${album.artist}`}
                              />
                            </div>
                          </div>
                        </Link>
                        <div className="flex flex-col justify-between flex-1 space-y-3">
                          <div className="flex-1 h-full">
                            <div className="flex flex-wrap gap-2 py-5">
                              {album.tags
                                .map((tag) => {
                                  return (
                                    <span
                                      className="text-xs lowercase px-1.5 border-2 border-secondary-light rounded-md text-offset hover:text-secondary hover:border-secondary"
                                      key={tag.name}
                                    >
                                      {tag.name}
                                    </span>
                                  );
                                })
                                .slice(0, 3)}
                            </div>

                            <Link href="/">
                              <Subtitle className={`text-default text-2xl line-clamp-2`}>
                                {album.name}
                              </Subtitle>
                            </Link>

                            <Heading className="font-sans text-offset lowercase text-lg xl:text-xl">
                              {album.artist}
                            </Heading>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Section>
        </Container>
      </section>
      <div className="bg-gradient-to-b from-soft-offset to-soft">
        <Container>
          <Section className="space-y-5">
            <div>
              <Subtitle className="text-primary-dark">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                  Top Albums
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
              <SubtitleLegend>* {convertPeriod(period)} *</SubtitleLegend>
            </div>
            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
              {topalbums.map((album, index) => {
                return (
                  <li key={`${album.name}-${index}`} className="flex gap-2 lg:items-start">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <Image
                        className="rounded-sm h-16 w-16 sm:h-32 sm:w-32 object-cover"
                        src={album.image[3]["#text"]}
                        alt={album.name}
                        width={300}
                        height={300}
                      />
                    </div>

                    <div className="w-full">
                      <Heading>
                        <span className="line-clamp-2">{album.name}</span>
                      </Heading>

                      <p className="space-x-2 line-clamp-1">
                        <LegendItalicBold>{album.artist}</LegendItalicBold>
                        <Legend>*</Legend>
                        <Legend>{album.playcount} plays</Legend>
                      </p>
                      <div className="flex flex-wrap gap-2 py-2">
                        {album.tags
                          .map((tag) => {
                            return (
                              <span
                                className="text-xs lowercase px-1.5 border-2 border-primary-light rounded-md text-offset hover:text-primary hover:border-primary"
                                key={tag.name}
                              >
                                {tag.name}
                              </span>
                            );
                          })
                          .slice(0, 3)}
                      </div>
                      <LinkYouTube
                        className="text-primary"
                        query={`${album.name} ${album.artist}`}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>
        </Container>
      </div>
    </>
  );
}
