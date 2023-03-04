import { Suspense } from "react";

import { MusicBrainzApi } from "musicbrainz-api";
import Image from "next/image";

import { Container } from "@/components";
import { formatDate } from "@/lib";
import LastFmApi from "@/lib/lastfm";
const lastFM = LastFmApi();

const {
  config: { username },
  method: { user },
  getRecentTracks,
  getTopAlbums,
  getTopArtists,
  getLovedTracks,
  getTopTracks,
  getInfo,
} = lastFM;

const next: NextFetchRequestConfig = { revalidate: 30 };

const userInfo = async () => await getInfo(user.getInfo, username, "overall", "200");

const recentTracks = async () =>
  await getRecentTracks(user.recent_tracks, username, "7day", "5", next);
const topAlbums = async () => await getTopAlbums(user.top_albums, username, "3month", "10");
const topArtists = async () => await getTopArtists(user.top_artists, username, "3month", "10");
const lovedTracks = async () =>
  await getLovedTracks(user.loved_tracks, username, "1month", "5", next);
const topTracks = async () => await getTopTracks(user.top_tracks, username, "1month", "10");

const convertDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  return formatDate(date, "en-US");
};

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
        <section className="col-span-12 lg:col-span-6 xl:col-span-4 space-y-5">
          <h2>Recent Tracks</h2>
          <ul className="space-y-5">
            {recenttracks.track.map((track, index) => {
              const isNowPlaying = track.date === undefined;
              const isDuplicate = recenttracks.track[index + 1]?.name === track.name;
              if (isDuplicate) return null;

              return (
                <li key={track.url}>
                  <h3>{track.name}</h3>
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
                    <a
                      href={`https://music.youtube.com/search?q=${track.name}${" "}${
                        track.artist.name
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary !font-normal self-center mt-0.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="text-primary"
                      >
                        <path
                          fill="currentColor"
                          d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"
                        ></path>
                      </svg>
                    </a>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-4 space-y-5">
          <h2>Top Albums</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last three months *
          </span>
          <ul className="space-y-5">
            <Suspense fallback={<div>Loading...</div>}>
              {topalbums.album.map((album, index) => {
                return (
                  <li key={`${album.name}-${index}`}>
                    <h3>{album.name}</h3>

                    <p className="flex space-x-2 items-baseline">
                      <span className="italic font-bold">{album.artist.name}</span>
                      <span className="text-xs text-offset self-end">*</span>
                      <span className="text-xs text-offset">{album.playcount} plays</span>
                      <a
                        href={`https://music.youtube.com/search?q=${album.name}${" "}${
                          album.artist.name
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary !font-normal self-center mt-0.5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="text-primary"
                        >
                          <path
                            fill="currentColor"
                            d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"
                          ></path>
                        </svg>
                      </a>
                    </p>
                  </li>
                );
              })}
            </Suspense>
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-4 space-y-5">
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
        <section className="col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Loved Tracks</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last month *
          </span>
          <ul className="space-y-5">
            {lovedtracks.track.map((track) => (
              <li key={track.url}>
                <h3>{track.name}</h3>
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
                  <a
                    href={`https://music.youtube.com/search?q=${track.name}${" "}${
                      track.artist.name
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary !font-normal self-center mt-0.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="text-primary"
                    >
                      <path
                        fill="currentColor"
                        d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"
                      ></path>
                    </svg>
                  </a>
                </p>{" "}
              </li>
            ))}
          </ul>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-4 space-y-5">
          <h2>Top Tracks</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last month *
          </span>
          <ul className="space-y-5">
            {toptracks.track.map((track) => (
              <li key={track.url}>
                <h3>{track.name}</h3>
                <p className="flex space-x-2 items-baseline">
                  <span className="italic font-bold">{track.artist.name}</span>
                  <span className="text-xs text-offset self-end">*</span>
                  <span className="text-xs text-offset">{track.playcount} plays</span>{" "}
                  <a
                    href={`https://music.youtube.com/search?q=${track.name}${" "}${
                      track.artist.name
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary !font-normal self-center mt-0.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="text-primary"
                    >
                      <path
                        fill="currentColor"
                        d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12s12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104s-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"
                      ></path>
                    </svg>
                  </a>
                </p>{" "}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
