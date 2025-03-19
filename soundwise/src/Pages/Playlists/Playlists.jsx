// Pages/Playlists.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

const Playlists = () => {
  const { spotifyToken } = useAuth();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [transferStatus, setTransferStatus] = useState(""); // Define transfer status state
  const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);
  const navigate = useNavigate();

  // Fetch Spotify Playlists
  useEffect(() => {
    const fetchSpotifyPlaylists = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/spotify/playlists",
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
            },
          }
        );
        const data = await response.json();

        if (data && Array.isArray(data.items)) {
          setSpotifyPlaylists(data.items);
        } else {
          console.error("Error: Invalid playlist data format.");
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchSpotifyPlaylists();
  }, [spotifyToken]);

  // Fetch tracks for the selected playlist
  const fetchPlaylistTracks = async (playlistHref) => {
    try {
      const response = await fetch(playlistHref, {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      });
      const data = await response.json();
      if (data?.tracks?.items) {
        setSelectedPlaylistTracks(data.tracks.items); // Save tracks to state
      } else {
        console.error("No tracks found in this playlist.");
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  // Handle playlist click for transfer
  const handlePlaylistClick = async (playlist) => {
    console.log("Transferring playlist:", playlist);

    // Fetch the tracks for the selected playlist
    await fetchPlaylistTracks(playlist.href);

    // Wait until the tracks are fetched
    if (
      !Array.isArray(selectedPlaylistTracks) ||
      selectedPlaylistTracks.length === 0
    ) {
      setTransferStatus("No tracks to transfer.");
      return;
    }

    try {
      // Make the transfer API call
      const transferResponse = await fetch(
        "http://localhost:8888/appleMusic/transfer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playlist: {
              name: playlist.name,
              description: playlist.description,
            },
            tracks: selectedPlaylistTracks.map((track) => ({
              name: track.track.name,
              artist: track.track.artists
                .map((artist) => artist.name)
                .join(", "),
              uri: track.track.uri,
            })),
          }),
        }
      );

      const transferData = await transferResponse.json();
      console.log("Transfer Response:", transferData);

      if (transferData.success) {
        setTransferStatus("Transfer successful!");
      } else {
        setTransferStatus("Transfer failed.");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
      setTransferStatus("Error during transfer.");
    }
  };

  const handleSelectPlaylist = (playlist) => {
    console.log("Navigating to Transfer with playlist:", playlist);
    navigate("/transfer", { state: { playlist } });
  };

  return (
    <div>
      <h1>Spotify Playlists</h1>
      {spotifyPlaylists.length > 0 ? (
        <ul>
          {spotifyPlaylists.map((playlist) => (
            <li key={playlist.id}>
              <button onClick={() => handleSelectPlaylist(playlist)}>
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No playlists found.</p>
      )}

      {/* Display transfer status */}
      {transferStatus && <p>{transferStatus}</p>}
    </div>
  );
};

export default Playlists;
