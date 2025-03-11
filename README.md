# SoundWise Music Transfer  App
<img src="./README assets/SoundWise_Logo.png" width="350">

## Overview
Music streaming has become an integral part of our lives in today’s digital age. Whether we're commuting, working out, or simply relaxing at home, music is a constant companion. With the growing number of music streaming platforms, it's essential to have a solution that seamlessly transfers your playlists and libraries between services. That’s where SoundWise comes in.

SoundWise allows users to effortlessly transfer playlists between popular music streaming platforms like Spotify and Apple Music. With just a few clicks, users can move their favorite music collections from one service to another, eliminating the hassle of manually recreating playlists.

### Problem Space
Many music streaming users face difficulties when switching platforms, as their carefully curated playlists don’t transfer automatically. Manually recreating playlists is both time-consuming and tedious. This app solves that problem by automating the playlist migration process, reducing frustration and making the switch between services effortless.

### User Profile
SoundWise is designed for music lovers who want to switch between Spotify and Apple Music without losing their playlists. This includes users exploring both platforms who need to maintain consistency across them, as well as people transitioning from free to premium plans on a new service and wishing to keep their music preferences intact.

In other words, anyone who uses a music streaming service and values playlist continuity is part of SoundWise's customer profile, whether they are casual listeners, young professionals, or music enthusiasts navigating multiple platforms.

### Features
- *User Authentication* – Users can securely authenticate with Spotify and Apple Music.
- *Playlist Transfer* - Seamlessly transfer playlists from Spotify to Apple Music.
- *Music Preview* – Preview playlists and their contents before initiating a transfer.
- *Error Handling* – The app notifies users if any songs are unavailable on the target platform.
- *Progress Indicator* – A real-time progress bar displays the status of the playlist transfer.
- *History Tracking* - Users can view past transfer attempts, including success and failure statuses.

## Implementation
### Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js with Express
- **Authentication:** OAuth (Spotify, Apple Music API)
- **Libraries:** Axios (for making API requests), dotenv (for managing environment variables), Tailwind or Sass(for styling), Rive, Three.js or GSAP (for animations)
- **Hosting:** Heroku or Netlify.

### APIs
- Spotify
- Apple Music

### Sitemap
- **Home Page:** Users can log in via Spotify or Apple Music.

- **Dashboard:** Displays available playlists from Spotify and Apple Music.

- **Transfer Page:** Users can select playlists and transfer them between services.

- **History Page:** Shows past transfer attempts and their statuses.

### Mockups

<img src="./README assets/SoundWise_Homepage.png">
<img src="./README assets/SoundWise_Auth.png">
<img src="./README assets/SoundWise_preview.png">
<img src="./README assets/SoundWise_Transfer.png">

### Data
**User Data:** Stores authentication tokens for Spotify and Apple Music accounts.

**Playlist Data:** Contains metadata about playlists, including song titles and track IDs from both platforms.

**Transfer History:** Tracks the status of each transfer attempt, including the source platform, destination platform, and result.

### Endpoints

    POST /auth/login: Authenticate user

    GET /playlists: Retrieve user playlists

    POST /transfer: Initiate playlist transfer

    GET /transfer/status: Check transfer progress

    GET /history: Fetch previous transfers

## Roadmap

*Sprint Breakdown (2 Weeks)*

### Week 1
- [ ] **Day 1** *Research Spotify and Apple Music APIs, set up project repository*

- [ ] **Day 2** *Set up backend with Express and authentication (OAuth 2.0)*

- [ ] **Day 3** *Implement API authentication and token management*

- [ ] **Day 4** *Fetch user playlists from Spotify and Apple Music*

- [ ] **Day 5** *Set up frontend UI structure and routing*

- [ ] **Day 6** *Display playlists in the UI and connect to backend*

- [ ] **Day 7** *Review progress, debug authentication & playlist retrieval*

### Week 2
- [ ] **Day 8** *Implement song matching logic between platforms*

- [ ] **Day 9** *Develop playlist creation feature on destination service*

- [ ] **Day 10** *Implement transfer progress tracking and UI updates*

- [ ] **Day 11** *Set up database (if needed) for user session management*

- [ ] **Day 12** *Conduct full integration testing and fix bugs*

- [ ] **Day 13** *Final UI enhancements and prepare for demo*

- [ ] **Day 14** *Final testing, documentation, and deployment*


## Future Implementations

**Multiple Playlist Transfers:** Allow users to select and transfer multiple playlists at once.

**Mobile app version:** Create a mobile-responsive version of the app for ease of use on phones and tablets.

<img src="./README assets/SoundWise_Banner.png" width="500">