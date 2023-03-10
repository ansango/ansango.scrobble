"use client";

import type { RecentTracks as TracksType } from "lastfm-client-ts";
import useSWR from "swr";

import { fetcher, formatDate } from "@/lib";

import {
  ActiveBullet,
  Heading,
  Legend,
  LegendItalicBold,
  LinkYouTube,
  Subtitle,
  SubtitleLegend,
} from "../base";
import { Section } from "../section";

export const RecentTracks = () => {
  const { data: recenttracks } = useSWR<TracksType>("/api/hello", fetcher);

  return (
    <Section>
      <div className="space-y-5 max-w-screen-lg mx-auto">
        <Subtitle className="text-primary-dark">
          Recent Tracks
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
                d="M21 5.18V17a4 4 0 1 1-2-3.465V9.181L9 10.847V18c0 .06-.005.117-.015.174A3.5 3.5 0 1 1 7 15.337v-8.49a2 2 0 0 1 1.671-1.973l10-1.666A2 2 0 0 1 21 5.18ZM5.5 17a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3ZM17 15a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm2-9.82L9 6.847V8.82l10-1.667V5.18Z"
              ></path>
            </g>
          </svg>
        </Subtitle>
        <SubtitleLegend className="text-primary-dark">* last played *</SubtitleLegend>
        <ul className="grid gap-5 grid-cols-12">
          {recenttracks?.track?.map((track, index) => {
            if (
              track["@attr"]?.nowplaying &&
              recenttracks?.track?.[index + 1]?.name === track.name &&
              recenttracks?.track?.[index + 1]?.artist["#text"] === track.artist["#text"]
            ) {
              return null;
            }

            return (
              <li key={`${track.url}-${index}`} className="col-span-12 lg:col-span-8">
                <Heading>
                  {track.name}
                  <LinkYouTube query={`${track.name} ${" "}${track.artist["#text"]}`} />
                </Heading>
                <p className="space-x-2">
                  <LegendItalicBold> {track.artist["#text"]}</LegendItalicBold>
                  <Legend>*</Legend>
                  <Legend className="relative">
                    {track.date && formatDate(track.date["#text"] as unknown as Date, "en-US")}
                    {track["@attr"]?.nowplaying && (
                      <>
                        now
                        <ActiveBullet />
                      </>
                    )}
                  </Legend>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
};
