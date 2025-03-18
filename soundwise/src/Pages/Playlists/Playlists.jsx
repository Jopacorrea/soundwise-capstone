// npm libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

const Playlists = () => {
  const { spotifyToken } = useAuth();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpotifyPlaylists = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/spotify/playlists",
          {
            headers: { Authorization: `Bearer ${spotifyToken}` },
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
  }, [spotifyToken, navigate]);

  const handlePlaylistSelection = (playlist) => {
    console.log("Transferring playlist:", playlist);
  };

  return (
    <div>
      <h1>Spotify Playlists</h1>
      {spotifyPlaylists.length > 0 ? (
        <ul>
          {spotifyPlaylists.map((playlist) => (
            <li key={playlist.id}>
              <button onClick={() => handlePlaylistSelection(playlist)}>
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No playlists found.</p>
      )}
    </div>
  );
};

export default Playlists;
