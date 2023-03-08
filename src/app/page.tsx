import { lastFmClient } from "lastfm-client-ts";
import Image from "next/image";

import { Container, LinkExternal } from "@/components";
import { YTMusic } from "@/components/icons";
import { convertDate, formatDate } from "@/lib";

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
    <Container className="grid gap-20">
      <section className="grid gap-5 grid-cols-12">
        <Image
          className="col-span-12"
          src={user.image[3]["#text"]}
          alt={user.name}
          width={120}
          height={120}
          loading="eager"
        />
        <div className="col-span-12">
          <h1>{user.name}</h1>
          <p className="flex space-x-2 items-baseline">
            <span className="legend self-end">*</span>
            <span className="legend">
              since {convertDate(user.registered["#text"] as unknown as string)}
            </span>
          </p>
          <div className="flex gap-3 flex-wrap">
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.artist_count}</span>
              <span className="legend">artist</span>
            </p>
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.album_count}</span>
              <span className="legend">albums</span>
            </p>
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.track_count}</span>
              <span className="legend">songs</span>
            </p>
            <p className="flex space-x-2 items-baseline">
              <span className="font-semibold italic">{user.playcount}</span>
              <span className="legend">plays</span>
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-y-20 grid-cols-12 sm:gap-x-5 lg:gap-20">
        <section className="col-span-12 lg:col-span-6 space-y-5">
          <h2>Recent Tracks</h2>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last played *
          </span>
          <ul className="space-y-5">
            {recenttracks.track.filter((track) => track.date === undefined).length > 0 && (
              <li className="flex flex-col space-y-2">
                <h3>
                  {recenttracks.track
                    .filter((track) => track.date === undefined)
                    .map((track) => track.name)}
                </h3>
                <p className="space-x-2">
                  <span className="italic font-semibold">
                    {recenttracks.track
                      .filter((track) => track.date === undefined)
                      .map((track) => track.artist["#text"])}
                  </span>
                  <span className="legend self-end">*</span>
                  <span className="legend relative">
                    now
                    <span
                      key={"ping"}
                      className="absolute top-0 right-0 -mr-3 mt-0.5 w-2 h-2 rounded-full bg-secondary animate-ping"
                    ></span>
                    <span
                      key={"dot"}
                      className="absolute top-0 right-0 -mr-3 mt-0.5 w-2 h-2 rounded-full bg-secondary"
                    ></span>
                  </span>
                </p>
              </li>
            )}
            {recenttracks.track
              .filter((track) => track.date !== undefined)
              .map((track, index) => {
                return (
                  <li key={`${track.url}-${index}`}>
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
                    <p className="space-x-2">
                      <span className="italic font-semibold"> {track.artist["#text"]}</span>

                      <span className="legend self-end">{track.date && <>*</>}</span>
                      <span className="legend relative">
                        {formatDate(track.date["#text"] as unknown as Date, "en-US")}
                      </span>
                    </p>
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
    </Container>
  );
}
