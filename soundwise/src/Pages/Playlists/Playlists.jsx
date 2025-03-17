// Playlists.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const backendURL = "http://localhost:8888"; // Your backend URL

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");

    if (!token) {
      console.error("No Spotify access token found");
      return;
    }

    async function fetchPlaylists() {
      try {
        const response = await axios.get(`${backendURL}/spotify/playlists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  if (loading) return <div>Loading playlists...</div>;

  return (
    <div>
      <h1>My Spotify Playlists</h1>
      {playlists.length > 0 ? (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.name}</li>
          ))}
        </ul>
      ) : (
        <p>No playlists found.</p>
      )}
    </div>
  );
}

export default Playlists;