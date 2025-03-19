// Pages/Transfer.jsx
// npm libraries
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";

const Transfer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playlist } = location.state || {};
  const { spotifyToken } = useAuth();
  const [tracks, setTracks] = useState([]);
  const [transferStatus, setTransferStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if we have all required data
  useEffect(() => {
    if (!spotifyToken) {
      setError("Spotify authentication required");
      return;
    }

    if (!playlist || !playlist.id) {
      setError("No playlist selected for transfer");
      return;
    }

    // Clear any previous errors when we have valid data
    setError(null);
  }, [spotifyToken, playlist]);

  // Fetch the tracks from the selected playlist
  useEffect(() => {
    if (!spotifyToken || !playlist || error) {
      return;
    }

    const fetchPlaylistTracks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("API Response:", data); // 👉 Check the full response

        if (!response.ok) {
          throw new Error(
            `Spotify API error: ${response.status} - ${data.error?.message}`
          );
        }

        if (data?.items?.length > 0) {
          setTracks(data.items);
          console.log(
            `Loaded ${data.items.length} tracks from playlist "${playlist.name}"`
          );
        } else {
          console.warn("No tracks found in this playlist.");
          setTracks([]);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError(`Failed to load tracks: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistTracks();
  }, [spotifyToken, playlist, error]);

  const handleTransferToAppleMusic = async () => {
    if (tracks.length === 0) {
      setTransferStatus("No tracks to transfer.");
      return;
    }

    setTransferStatus("Transferring to Apple Music...");

    try {
      // Get Apple Music instance and token
      const music = window.MusicKit.getInstance();
      if (!music || !music.isAuthorized) {
        throw new Error(
          "Apple Music is not authorized. Please authenticate first."
        );
      }

      const appleMusicUserToken = music.musicUserToken;

      // Call your backend endpoint
      const transferResponse = await fetch(
        "http://localhost:8888/apple/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${spotifyToken}`,
          },
          body: JSON.stringify({
            appleMusicToken: appleMusicUserToken,
            playlist: {
              name: playlist.name,
              description: playlist.description || "Transferred from Spotify",
            },
            tracks: tracks.map((track) => ({
              name: track.track.name,
              artist: track.track.artists.map((a) => a.name).join(", "),
              album: track.track.album?.name || "",
              uri: track.track.uri,
              isrc: track.track.external_ids?.isrc || null, // ISRC is helpful for Apple Music matching
            })),
          }),
        }
      );

      if (!transferResponse.ok) {
        throw new Error(`Transfer API error: ${transferResponse.status}`);
      }

      const transferData = await transferResponse.json();

      if (transferData.success) {
        setTransferStatus(
          <>
            Transfer successful! Check your{" "}
            <a
              href={`applemusic://playlist/${transferData.appleMusicPlaylistId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apple Music playlist
            </a>
            .
          </>
        );
      } else {
        setTransferStatus(
          `Transfer failed: ${transferData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error transferring to Apple Music:", error);
      setTransferStatus(`Transfer failed: ${error.message || "Unknown error"}`);
    }
  };

  // Redirect to auth if missing credentials
  useEffect(() => {
    if (error === "Spotify authentication required") {
      navigate("/auth");
    }
  }, [error, navigate]);

  return (
    <div className="transfer-container">
      <h1>Transfer Playlist</h1>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => navigate("/playlists")}>
            Go Back to Playlists
          </button>
        </div>
      ) : (
        <>
          <h2>{playlist?.name}</h2>
          {playlist?.description && <p>{playlist.description}</p>}

          <div className="tracks-container">
            <h3>Tracks to Transfer ({tracks.length})</h3>
            {loading ? (
              <p className="loading">Loading tracks...</p>
            ) : tracks.length > 0 ? (
              <ul className="tracks-list">
                {tracks.map((track, index) => (
                  <li key={`${track.track.id || index}`} className="track-item">
                    <div className="track-info">
                      <strong>{track.track.name}</strong> -{" "}
                      {track.track.artists.map((a) => a.name).join(", ")}
                      {track.track.album && (
                        <span className="album-name">
                          {" "}
                          • {track.track.album.name}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-tracks">No tracks available in this playlist.</p>
            )}
          </div>

          <div className="action-buttons">
            <button
              className="transfer-button"
              onClick={handleTransferToAppleMusic}
              disabled={tracks.length === 0 || loading}
            >
              Transfer to Apple Music
            </button>

            <button
              className="back-button"
              onClick={() => navigate("/playlists")}
            >
              Back to Playlists
            </button>
          </div>

          {transferStatus && (
            <div className="transfer-status">{transferStatus}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Transfer;
