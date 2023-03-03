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

const recentTracks = async () => await getRecentTracks(user.recent_tracks, username, "7days", "10");

const topAlbums = async () => await getTopAlbums(user.top_albums, username, "overall", "10");

const topArtists = async () => await getTopArtists(user.top_artists, username, "overall", "10");

const lovedTracks = async () => await getLovedTracks(user.loved_tracks, username, "overall", "10");

const topTracks = async () => await getTopTracks(user.top_tracks, username, "overall", "10");

export default async function Home() {
  const { recenttracks } = await recentTracks();
  const { topalbums } = await topAlbums();
  const { topartists } = await topArtists();
  const { lovedtracks } = await lovedTracks();
  const { toptracks } = await topTracks();
  return (
    <main className="p-5 grid gap-5 grid-cols-12 md:gap-10">
      <section className="col-span-12 sm:col-span-6 md:col-span-4">
        <h2>Recent Tracks</h2>
        <ul>
          {recenttracks.track.map((track) => (
            <li key={track.url}>
              <h3>{track.name}</h3>
              <p>{track.artist["#text"]}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="col-span-12 sm:col-span-6 md:col-span-4">
        <h2>Top Albums</h2>
        <ul>
          {topalbums.album.map((album, index) => (
            <li key={`${album.name}-${index}`}>
              <h3>{album.name}</h3>
              <p>{album.artist.name}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="col-span-12 sm:col-span-6 md:col-span-4">
        <h2>Top Artists</h2>
        <ul>
          {topartists.artist.map((artist, index) => (
            <li key={`${artist.name}-${index}`}>
              <h3>{artist.name}</h3>
              <p>{artist.playcount}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="col-span-12 sm:col-span-6 md:col-span-4">
        <h2>Loved Tracks</h2>
        <ul>
          {lovedtracks.track.map((track) => (
            <li key={track.url}>
              <h3>{track.name}</h3>
              <p>{track.artist["#text"]}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="col-span-12 sm:col-span-6 md:col-span-4">
        <h2>Top Tracks</h2>
        <ul>
          {toptracks.track.map((track) => (
            <li key={track.url}>
              <h3>{track.name}</h3>
              <p>{track.artist.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
