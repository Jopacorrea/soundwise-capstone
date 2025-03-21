// Pages/Playlists.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

//style
import "./Playlists.scss";
import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

const Playlists = () => {
  const { spotifyToken } = useAuth();
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transferStatus, setTransferStatus] = useState("");
  const navigate = useNavigate();

  // Fetch Spotify Playlists with pagination
  useEffect(() => {
    const fetchAllSpotifyPlaylists = async () => {
      setLoading(true);
      try {
        let allPlaylists = [];
        let nextUrl =
          "http://localhost:8888/spotify/playlists?limit=50&offset=0";

        while (nextUrl) {
          console.log("Fetching playlists from:", nextUrl);
          const response = await fetch(nextUrl, {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
            },
          });

          const data = await response.json();

          if (data && Array.isArray(data.items)) {
            allPlaylists = [...allPlaylists, ...data.items];
            console.log(
              `Fetched ${data.items.length} playlists, total: ${allPlaylists.length}`
            );

            // Check if there's a next page
            nextUrl = data.next
              ? `http://localhost:8888/spotify/playlists?limit=50&offset=${allPlaylists.length}`
              : null;
          } else {
            console.error("Error: Invalid playlist data format.");
            nextUrl = null;
          }
        }

        setSpotifyPlaylists(allPlaylists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSpotifyPlaylists();
  }, [spotifyToken]);

  const handleSelectPlaylist = (playlist) => {
    console.log("Navigating to Transfer with playlist:", playlist);
    navigate("/transfer", { state: { playlist } });
  };

  return (
    <div className="playlists-component">
      <Header/>
      <h1 className="playlists-component__title">Spotify Playlists</h1>
      {spotifyPlaylists.length > 0 ? (
        <div className="playlists-component__list">
          {spotifyPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-item" onClick={() => handleSelectPlaylist(playlist)}>
              <img src={playlist.images[0].url} alt={playlist.name} className="playlist-item__image" />
              <p className="playlist-item__title">{playlist.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="playlists-component__no-playlists">No playlists found</p>
      )}

      {/* Display transfer status */}
      {transferStatus && <p>{transferStatus}</p>}
      <Footer />
    </div>
  );
};

export default Playlists;
