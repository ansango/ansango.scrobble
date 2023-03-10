import type { From, Limit, Period, To, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";
import Image from "next/image";

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
import { convertPeriod } from "@/lib";

const {
  userApiMethods: { getTopAlbums, getWeeklyAlbumChart },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "20";
const period: Period = "12month";

const from: From = (Math.floor(Date.now() / 1000) - 604800).toString();
const to: To = Math.floor(Date.now() / 1000).toString();

const getFavAlbums = async ({ limit }: { limit: string }) => {
  const { weeklyalbumchart } = await getWeeklyAlbumChart({ user, from, to });
  return weeklyalbumchart.album.filter((album) => parseInt(album["@attr"].rank) <= parseInt(limit));
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
        fill="#BB1A34"
        d="m33.207 19.773l-8.868-8.855L11.105 24.54l8.684 8.685l.001-.001A9.472 9.472 0 0 0 26.5 36c5.246 0 9.5-4.254 9.5-9.5a9.47 9.47 0 0 0-2.793-6.727z"
      ></path>
      <path
        fill="#FDCB58"
        d="M15.921 2.513A9.453 9.453 0 0 0 9.5 0A9.5 9.5 0 0 0 0 9.5c0 2.479.958 4.73 2.514 6.421l-.014.014l8.605 8.605l13.234-13.622l-8.418-8.405z"
      ></path>
    </svg>
  );
};

export default async function Albums() {
  const { topalbums } = await getTopAlbums({ user, period, limit });
  const favAlbums = await getFavAlbums({ limit: "3" });

  return (
    <>
      <section className="bg-gradient-to-b from-soft to-soft">
        <Container>
          <Section>
            <div className="max-w-screen-lg mx-auto space-y-5 lg:space-y-10">
              <Title>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-light">
                  weekly records
                </span>
              </Title>
              <ul className="grid gap-5 xl:gap-y-20 grid-cols-12">
                {favAlbums.map((album, i) => {
                  return (
                    <li
                      key={album.url}
                      className={`col-span-12 ${i === 0 ? "xl:col-span-12" : "xl:col-span-6"}`}
                    >
                      <Subtitle className={`text-default max-w-screen-sm text-2xl lg:text-3xl`}>
                        {album.name}

                        {favAlbums.map((track, i) => {
                          if (i < 3) {
                            return <Icon key={track.url} />;
                          }
                        })}
                      </Subtitle>
                      <Heading className="font-sans text-offset lowercase text-lg xl:text-xl">
                        {album.artist["#text"]}{" "}
                      </Heading>
                      <p>
                        <LinkYouTube
                          className="text-offset"
                          query={`${album.name} ${album.artist["#text"]}`}
                        />
                      </p>
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
          <Section className="space-y-5">
            <div className="px-5">
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
            <ul className="grid grid-cols-12 gap-5 lg:gap-10">
              {topalbums.album.map((album, index) => {
                return (
                  <li
                    key={`${album.name}-${index}`}
                    className="col-span-12 md:col-span-6 xl:col-span-4 border-2 hover:border-2 border-primary-light hover:border-primary-dark rounded-lg h-28 p-2 cursor-pointer flex items-center gap-5"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        className="rounded-md"
                        src={album.image[3]["#text"]}
                        alt={album.name}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div>
                      <Heading>
                        <span className="line-clamp-2">{album.name}</span>
                      </Heading>

                      <p className="space-x-2">
                        <LegendItalicBold>{album.artist.name}</LegendItalicBold>
                        <Legend>*</Legend>
                        <Legend>{album.playcount} plays</Legend>
                      </p>
                      <LinkYouTube
                        className="text-primary hidden"
                        query={`${album.name} ${album.artist.name}`}
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
