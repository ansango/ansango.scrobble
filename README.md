# ansango.scrobble

**ansango.scrobble** is a Next.js application that allows users to view their Last.fm scrobbles. The app provides insights into listening habits by displaying top artists, albums, tracks, and recent scrobbles.

## Features

- **Top Artists**: View a list of the most listened-to artists.
- **Top Albums**: Browse through the albums that have been scrobbled the most.
- **Top Tracks**: See the tracks that have been scrobbled the most.
- **Recent Scrobbles**: Check out the most recent scrobbles.

## Installation

1. **Clone the Repository**:
   Clone this repository to your local machine.
   ```sh
   git clone https://github.com/ansango/ansango.scrobble.git
   ```

2. **Install Dependencies**:
   Navigate to the project directory and install the necessary dependencies.
   ```sh
   cd ansango.scrobble
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory of the project and add your Last.fm API keys.
   ```env
   LASTFM_API_BASE_URL=""
   LASTFM_USER=""
   LASTFM_API_KEY=""
   LASTFM_APPNAME=""
   ```

4. **Run the Development Server**:
   Start the development server to see the application in action.
   ```sh
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Access the Dashboard**:
   Once the app is running, navigate to the main dashboard to see an overview of your listening statistics.

2. **View Scrobble Data**:
   - **Top Artists**: Explore the artists you’ve scrobbled the most.
   - **Top Albums**: Discover which albums have been played the most.
   - **Top Tracks**: Find out which tracks are your top scrobbles.
   - **Recent Scrobbles**: Review your most recent scrobbles.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Last.fm API](https://www.last.fm/api) for providing access to scrobble data.
- [Next.js](https://nextjs.org/) for the powerful React framework used to build this application.

For any questions or support, please open an issue in the repository.
