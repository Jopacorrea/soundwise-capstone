# SoundWise Music Transfer App

<p align="center"><img src="./README assets/SoundWise_Logo.png" width="350"></p>

## Overview

Music streaming has become an integral part of our lives in today’s digital age. Whether we're commuting, working out, or simply relaxing at home, music is a constant companion. With the growing number of music streaming platforms, it's essential to have a solution that seamlessly transfers your playlists and libraries between services. That’s where SoundWise comes in.

SoundWise allows users to effortlessly transfer playlists between popular music streaming platforms like Spotify and Apple Music. With just a few clicks, users can move their favorite music collections from one service to another, eliminating the hassle of manually recreating playlists.

### Problem Space

Many music streaming users face difficulties when switching platforms, as their carefully curated playlists don’t transfer automatically. Manually recreating playlists is both time-consuming and tedious. This app solves that problem by automating the playlist migration process, reducing frustration and making the switch between services effortless.

### User Profile

SoundWise is designed for music lovers who want to switch between Spotify and Apple Music without losing their playlists. This includes users exploring both platforms who need to maintain consistency across them, as well as people transitioning from free to premium plans on a new service and wishing to keep their music preferences intact.

In other words, anyone who uses a music streaming service and values playlist continuity is part of SoundWise's customer profile, whether they are casual listeners, young professionals, or music enthusiasts navigating multiple platforms.

### Features

- _User Authentication_ – Users can securely authenticate with Spotify and Apple Music.
- _Playlist Transfer_ - Seamlessly transfer playlists from Spotify to Apple Music.
- _Music Preview_ – Preview playlists and their contents before initiating a transfer.
- _Error Handling_ – The app notifies users if any songs are unavailable on the target platform.
- _Progress Indicator_ – A real-time progress bar displays the status of the playlist transfer.
- _History Tracking_ - Users can view past transfer attempts, including success and failure statuses.

## Implementation

### Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js with Express
- **Authentication:** OAuth (Spotify, Apple Music API + MusicKit JS)
- **Libraries:** Axios (for making API requests), dotenv (for managing environment variables), Sass(for styling)
- **Hosting:** Heroku or Netlify.

### APIs

- Spotify
- Apple Music
- MusicKit JS

### Sitemap

- **Home Page:** Landing page.

- **Connecting Services Page:** Users can connect with both services by following the OAuth flow.

- **Playlists Page:** Displays available playlists from user's profile in Spotify.

- **Playlist Details Page:** Users can see all the song within the playlist and start the transfer or navigate to Playlists page to select a diffenrent one.

- **Summary Page:** Shows final status of the process and offers a navigation link to Apple Music, to increase UX.

- **404 page:** Shows a redirect button to Home Page.

### Mockups

<img src="./README assets/SoundWise_Homepage.png">
<img src="./README assets/SoundWise_Auth.png">
<img src="./README assets/SoundWise_preview.png">
<img src="./README assets/SoundWise_Transfer.png">

### Data

**User Data:** Stores authentication tokens for Spotify and Apple Music accounts.

**Playlist Data:** Contains metadata about playlists, including song titles and track IDs from both platforms.

### Endpoints

    POST /auth: Authenticate user

    GET /playlists: Retrieve user playlists

    POST /transfer: Initiate playlist transfer

    GET /summary: Check transfer progress


## Roadmap

_Sprint Breakdown (2 Weeks)_

### Week 1

- [x] **Day 1** _Research Spotify and Apple Music APIs, set up project repository_

- [x] **Day 2** _Set up backend with Express and authentication (OAuth 2.0)_

- [x] **Day 3** _Implement API authentication and token management_

- [x] **Day 4** _Fetch user playlists from Spotify✅ and Apple Music(Frontend MusicKit JS ✅)_

- [x] **Day 5** _Set up frontend UI structure and routing_

- [x] **Day 6** _Display playlists in the UI and connect to backend_

- [x] **Day 7** _Review progress, debug authentication & playlist retrieval_

### Week 2

- [x] **Day 8** _Implement song matching logic between platforms_

- [x] **Day 9** _Develop playlist creation feature on destination service_

- [x] **Day 10** _Implement transfer progress tracking and UI updates_

- [x] **Day 11** _Set up local storage for auth keys_

- [x] **Day 12** _Conduct full integration testing and fix bugs_

- [ ] **Day 13** _Final UI enhancements and prepare for demo_

- [ ] **Day 14** _Final testing, documentation, and deployment_

- [x] **Mobile app version:** Create a mobile-responsive version of the app for ease of use on phones and tablets.

## Future Implementations

**Multiple Playlist Transfers:** Allow users to select and transfer multiple playlists at once.

**Transfer from Apple Music to Spotify:** Create the reverse flow to better coverage of users demand.


<p align="center">
    <img src="./README assets/SoundWise_Banner.png" width="500">
</p>
