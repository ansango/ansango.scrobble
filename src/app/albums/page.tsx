import type { Limit, Period, UserName } from "lastfm-client-ts";
import { lastFmClient } from "lastfm-client-ts";

import { Container, LinkExternal } from "@/components";
import { YTMusic } from "@/components/icons";
import { convertPeriod } from "@/lib";

const {
  userApiMethods: { getTopAlbums },
} = lastFmClient();

const user: UserName = "ansango";
const limit: Limit = "20";
const period: Period = "12month";

const topAlbums = async () => await getTopAlbums({ user, period, limit });

export default async function Albums() {
  const { topalbums } = await topAlbums();
  return (
    <Container className="grid grid-cols-12">
      <section className="col-span-12 space-y-5">
        <h2>Top Albums</h2>
        <span className="font-serif text-primary text-sm tracking-normal font-normal">
          * {convertPeriod(period)} *
        </span>
        <ul className="grid grid-cols-12 gap-5 lg:gap-20">
          {topalbums.album.map((album, index) => {
            return (
              <li
                key={`${album.name}-${index}`}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
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

                <span className="space-x-2">
                  <span className="italic font-bold">{album.artist.name}</span>
                  <span className="text-xs text-offset">*</span>
                  <span className="text-xs text-offset">{album.playcount} plays</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}
