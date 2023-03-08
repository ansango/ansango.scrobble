import { Suspense } from "react";

import { lastFmClient } from "lastfm-client-ts";
import Image from "next/image";

import { Container, LinkExternal } from "@/components";
import { YTMusic } from "@/components/icons";
import { formatDate, convertDate } from "@/lib";

const {
  userApiMethods: {
    getTopAlbums,
    getTopTracks,
    getLovedTracks,
    getTopArtists,
    getInfo,
    getRecentTracks,
  },
} = lastFmClient();

const next: NextFetchRequestConfig = { revalidate: 30 };
const user = "ansango";
const limit = "10";
const period = "3month";
const userInfo = async () => await getInfo({ user }, { next });

const recentTracks = async () => await getRecentTracks({ user, limit });

const topAlbums = async () => await getTopAlbums({ user, period, limit });

const topArtists = async () => await getTopArtists({ user, period, limit });
const lovedTracks = async () => await getLovedTracks({ user, limit });

const topTracks = async () => await getTopTracks({ user, period: "1month", limit });

export default async function Home() {
  const { recenttracks } = await recentTracks();
  const { topalbums } = await topAlbums();
  const { topartists } = await topArtists();
  const { lovedtracks } = await lovedTracks();
  const { toptracks } = await topTracks();
  const { user } = await userInfo();

  return (
    <Container className="grid gap-20">
      <section className="grid gap-5 grid-cols-12">
        <Image
          className="col-span-12"
          src={user.image[3]["#text"]}
          alt={user.name}
          width={100}
          height={100}
          loading="eager"
        />
        <div className="col-span-12">
          <h1>{user.name}</h1>
          <p className="flex space-x-2 items-baseline">
            <span className="text-xs text-offset self-end">*</span>
            <span className="text-xs text-offset">
              since {convertDate(user.registered["#text"] as unknown as string)}
            </span>
          </p>
          <div className="flex gap-3 flex-wrap">
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.artist_count}</span>
              <span className="text-xs text-offset">artist</span>
            </p>
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.album_count}</span>
              <span className="text-xs text-offset">albums</span>
            </p>
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.track_count}</span>
              <span className="text-xs text-offset">songs</span>
            </p>
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.playcount}</span>
              <span className="text-xs text-offset">plays</span>
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-y-20 grid-cols-12 sm:gap-x-5 lg:gap-20">
        <section className="col-span-12 lg:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Recent Tracks</h2>
          <ul className="space-y-5">
            {recenttracks.track.map((track, index) => {
              const isNowPlaying = track.date === undefined;
              const isDuplicate = recenttracks.track[index + 1]?.name === track.name;
              if (isDuplicate) return null;

              return (
                <li key={track.url}>
                  <h3>
                    {track.name}
                    <LinkExternal
                      href={`https://music.youtube.com/search?q=${track.name}${" "}${
                        track.artist["#text"]
                      }`}
                      className="inline-block ml-2"
                    >
                      <YTMusic />
                    </LinkExternal>
                  </h3>
                  <p className="flex space-x-2 items-baseline">
                    <span className="italic font-semibold"> {track.artist["#text"]}</span>
                    {track.date ? (
                      <>
                        <span className="text-xs text-offset self-end">*</span>
                        <span className="text-xs text-offset">
                          {formatDate(track.date["#text"] as unknown as Date, "en-US")}
                        </span>
                      </>
                    ) : (
                      isNowPlaying && (
                        <div className="relative">
                          <span className="text-xs text-offset self-end">*</span>
                          <span className="text-xs text-offset">now playing</span>

                          <div className="absolute top-0 right-0 -mr-2 mt-1 w-2 h-2 rounded-full bg-secondary animate-ping"></div>
                          <div className="absolute top-0 right-0 -mr-2 mt-1 w-2 h-2 rounded-full bg-secondary"></div>
                        </div>
                      )
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Top Albums</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last three months *
          </span>
          <ul className="space-y-5">
            {topalbums.album.map((album, index) => {
              return (
                <li key={`${album.name}-${index}`}>
                  <h3>
                    {album.name}
                    <LinkExternal
                      href={`https://music.youtube.com/search?q=${album.name}${" "}${
                        album.artist.name
                      }`}
                      className="inline-block ml-2"
                    >
                      <YTMusic />
                    </LinkExternal>
                  </h3>

                  <p className="flex space-x-2 items-baseline">
                    <span className="italic font-bold">{album.artist.name}</span>
                    <span className="text-xs text-offset self-end">*</span>
                    <span className="text-xs text-offset">{album.playcount} plays</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Top Artists </h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last three months *
          </span>
          <ul className="space-y-5">
            {topartists.artist.map((artist, index) => (
              <li key={`${artist.name}-${index}`} className="flex space-x-2 items-baseline">
                <h3>{artist.name}</h3>
                <span className="text-xs text-offset self-end">*</span>
                <p className="text-xs text-offset">{artist.playcount} plays</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Loved Tracks</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last month *
          </span>
          <ul className="space-y-5">
            {lovedtracks.track.map((track) => (
              <li key={track.url}>
                <h3>
                  {track.name}
                  <LinkExternal
                    href={`https://music.youtube.com/search?q=${track.name}${" "}${
                      track.artist.name
                    }`}
                    className="inline-block ml-2"
                  >
                    <YTMusic />
                  </LinkExternal>
                </h3>
                <p className="flex space-x-2 items-baseline">
                  <span className="italic font-semibold">{track.artist.name}</span>
                  {track.date && (
                    <>
                      <span className="text-xs text-offset self-end">*</span>
                      <span className="text-xs text-offset">
                        {formatDate(track.date["#text"] as unknown as Date, "en-US")}
                      </span>
                    </>
                  )}
                </p>{" "}
              </li>
            ))}
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Top Tracks</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last month *
          </span>
          <ul className="space-y-5">
            {toptracks.track.map((track) => (
              <li key={track.url}>
                <h3>
                  {track.name}
                  <LinkExternal
                    href={`https://music.youtube.com/search?q=${track.name}${" "}${
                      track.artist.name
                    }`}
                    className="inline-block ml-2"
                  >
                    <YTMusic />
                  </LinkExternal>
                </h3>

                <p className="space-x-2">
                  <span className="italic font-bold">{track.artist.name}</span>
                  <span className="text-xs text-offset">*</span>
                  <span className="text-xs text-offset">{track.playcount} plays</span>{" "}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
