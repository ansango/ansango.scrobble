import { Container } from "@/components";
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
} = lastFM;

const recentTracks = async () => await getRecentTracks(user.recent_tracks, username, "7day", "5");
const topAlbums = async () => await getTopAlbums(user.top_albums, username, "3month", "10");
const topArtists = async () => await getTopArtists(user.top_artists, username, "3month", "10");
const lovedTracks = async () => await getLovedTracks(user.loved_tracks, username, "1month", "5");
const topTracks = async () => await getTopTracks(user.top_tracks, username, "1month", "10");

const Title = ({ children }) => <h2>{children}</h2>;

const ListContainer = ({ children }) => <ul className="space-y-5">{children}</ul>;

export const formatDate = (date, locale = "es-ES", options?: Intl.DateTimeFormatOptions) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const _options = options || defaultOptions;
  const now = new Date(date).toLocaleDateString(locale, _options);

  return now;
};

export default async function Home() {
  const { recenttracks } = await recentTracks();
  const { topalbums } = await topAlbums();
  const { topartists } = await topArtists();
  const { lovedtracks } = await lovedTracks();
  const { toptracks } = await topTracks();

  return (
    <Container>
      <div className="grid gap-y-20 grid-cols-12 sm:gap-x-5 lg:gap-20">
        <section className="col-span-12 lg:col-span-6 xl:col-span-4 space-y-5">
          <Title>Recent Tracks</Title>
          <ListContainer>
            {recenttracks.track.map((track) => (
              <li key={track.url}>
                <h3>{track.name}</h3>
                <p className="flex space-x-2 items-baseline">
                  <span className="italic font-semibold"> {track.artist["#text"]}</span>
                  {track.date && (
                    <>
                      <span className="text-xs text-offset self-end">*</span>
                      <span className="text-xs text-offset">
                        {formatDate(track.date["#text"], "en-US")}
                      </span>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ListContainer>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-4 space-y-5">
          <Title>Top Albums</Title>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last three months *
          </span>
          <ListContainer>
            {topalbums.album.map((album, index) => (
              <li key={`${album.name}-${index}`}>
                <h3>{album.name}</h3>
                <p className="flex space-x-2 items-baseline">
                  <span className="italic font-bold">{album.artist.name}</span>
                  <span className="text-xs text-offset self-end">*</span>
                  <span className="text-xs text-offset">{album.playcount} plays</span>
                </p>
              </li>
            ))}
          </ListContainer>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-4 space-y-5">
          <Title>Top Artists </Title>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last three months *
          </span>
          <ListContainer>
            {topartists.artist.map((artist, index) => (
              <li key={`${artist.name}-${index}`} className="flex space-x-2 items-baseline">
                <h3>{artist.name}</h3>
                <span className="text-xs text-offset self-end">*</span>
                <p className="text-xs text-offset">{artist.playcount} plays</p>
              </li>
            ))}
          </ListContainer>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-4 space-y-5">
          <Title>Loved Tracks</Title>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last month *
          </span>
          <ListContainer>
            {lovedtracks.track.map((track) => (
              <li key={track.url}>
                <h3>{track.name}</h3>
                <p className="flex space-x-2 items-baseline">
                  <span className="italic font-semibold">{track.artist.name}</span>
                  {track.date && (
                    <>
                      <span className="text-xs text-offset self-end">*</span>
                      <span className="text-xs text-offset">
                        {formatDate(track.date["#text"], "en-US")}
                      </span>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ListContainer>
        </section>
        <section className="col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-4 space-y-5">
          <Title>Top Tracks</Title>
          <span className="font-serif text-primary text-sm tracking-normal font-normal">
            * last month *
          </span>
          <ListContainer>
            {toptracks.track.map((track) => (
              <li key={track.url}>
                <h3>{track.name}</h3>
                <p className="flex space-x-2 items-baseline">
                  <span className="italic font-bold">{track.artist.name}</span>
                  <span className="text-xs text-offset self-end">*</span>
                  <span className="text-xs text-offset">{track.playcount} plays</span>
                </p>
              </li>
            ))}
          </ListContainer>
        </section>
      </div>
    </Container>
  );
}
