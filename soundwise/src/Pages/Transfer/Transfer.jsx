// // Pages/Transfer.jsx
//npm libraries
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import axios from "axios";

const Transfer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playlist } = location.state || {};
  const { spotifyToken } = useAuth();

  const [tracks, setTracks] = useState([]);
  const [transferStatus, setTransferStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tracksLoading, setTracksLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transferResult, setTransferResult] = useState(null);

  // Check Spotify authentication
  useEffect(() => {
    if (!spotifyToken) {
      setError("Spotify authentication required");
      navigate("/auth");
    }
  }, [spotifyToken, navigate]);

  // Navigate to summary when transfer completes
  useEffect(() => {
    if (transferResult) {
      navigate("/summary", {
        state: {
          result: transferResult,
          playlist: playlist,
          tracksCount: tracks.length,
        },
      });
    }
  }, [transferResult, navigate, playlist, tracks.length]);

  // Load playlist tracks
  useEffect(() => {
    if (!spotifyToken || !playlist?.id) {
      setError("No playlist selected for transfer");
      setTracksLoading(false);
      return;
    }

    const fetchPlaylistTracks = async () => {
      setTracksLoading(true);
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${spotifyToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.items && response.data.items.length > 0) {
          setTracks(response.data.items);
          console.log(
            `Loaded ${response.data.items.length} tracks from Spotify`
          );
        } else {
          setError("No tracks found in this playlist");
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError(`Failed to load tracks: ${error.message}`);
      } finally {
        setTracksLoading(false);
      }
    };

    fetchPlaylistTracks();
  }, [spotifyToken, playlist]);

  // Check MusicKit initialization
  useEffect(() => {
    // Verify MusicKit is available
    if (window.MusicKit) {
      try {
        const music = window.MusicKit.getInstance();
        console.log(
          "MusicKit status:",
          music ? "Available" : "Not initialized"
        );
        if (music) {
          console.log("Apple Music authorized:", music.isAuthorized);
        }
      } catch (error) {
        console.warn("MusicKit check failed:", error.message);
      }
    } else {
      console.warn("MusicKit not available - make sure it's properly loaded");
    }
  }, []);

  const handleTransferToAppleMusic = async () => {
    if (tracks.length === 0) {
      setTransferStatus("No tracks to transfer.");
      return;
    }

    setTransferStatus("Preparing transfer to Apple Music...");
    setLoading(true);

    try {
      // Initialize and authorize with Apple Music
      let music;
      try {
        music = window.MusicKit.getInstance();
        if (!music) throw new Error("MusicKit instance is not available.");

        console.log(
          "Current Apple Music authorization status:",
          music.isAuthorized
        );

        // Authorize if needed
        if (!music.isAuthorized) {
          setTransferStatus("Authorizing with Apple Music...");
          await music.authorize();
          console.log(
            "After authorization attempt, status:",
            music.isAuthorized
          );
        }
      } catch (musicKitError) {
        throw new Error(`MusicKit error: ${musicKitError.message}`);
      }

      if (!music.isAuthorized) {
        throw new Error("Apple Music authorization failed or was denied.");
      }

      // Get tokens
      const appleMusicUserToken = music.musicUserToken;
      const appleDeveloperToken = music.developerToken;

      if (!appleMusicUserToken) {
        throw new Error("Failed to obtain Apple Music user token");
      }

      console.log(
        "Have Apple Music tokens:",
        appleMusicUserToken ? "✓ User Token" : "✗ No User Token",
        appleDeveloperToken ? "✓ Developer Token" : "✗ No Developer Token"
      );

      // Format track data
      setTransferStatus("Preparing track data...");
      const trackData = tracks.map((track) => ({
        name: track.track.name,
        artist: track.track.artists.map((a) => a.name).join(", "),
        album: track.track.album?.name || "",
        uri: track.track.uri,
        isrc: track.track.external_ids?.isrc || null,
      }));

      // Make the transfer request
      setTransferStatus("Transferring tracks to Apple Music...");
      console.log("Sending transfer request with", trackData.length, "tracks");

      const response = await axios.post(
        "http://localhost:8888/apple/transfer",
        {
          playlist: {
            name: playlist.name,
            description: playlist.description || "Transferred from SoundWise 💜",
          },
          tracks: trackData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${appleMusicUserToken}`,
            "Developer-Token": appleDeveloperToken,
          },
        }
      );

      console.log("Transfer response:", response.data);

      if (response.data.success) {
        setTransferStatus("Transfer successful! Redirecting to summary...");

        // Set transfer result to trigger navigation
        setTransferResult({
          success: true,
          message: `Successfully transferred playlist "${playlist.name}"`,
          tracksAdded: response.data.tracksAdded || 0,
          totalTracks: trackData.length,
          appleMusicPlaylistId: response.data.appleMusicPlaylistId,
        });
      } else {
        throw new Error(response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setTransferStatus(
        `Transfer failed: ${error.message}. Redirecting to summary...`
      );

      // Set transfer result with error to trigger navigation
      setTransferResult({
        success: false,
        message: `Failed to transfer playlist: ${error.message}`,
        error: error.message,
      });
    } finally {
      setLoading(false);

      // If for some reason the transfer result wasn't set, set it now
      setTimeout(() => {
        if (!transferResult) {
          setTransferResult({
            success: false,
            message: "Transfer timeout or unknown error",
            error: "Transfer process did not complete properly",
          });
        }
      }, 3000); // Wait 3 seconds before forcing navigation
    }
  };

  return (
    <div className="transfer-container">
      <h1>Transfer Playlist</h1>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => navigate("/playlists")}>Go Back</button>
        </div>
      ) : (
        <>
          <h2>{playlist?.name}</h2>
          {playlist?.description && <p>{playlist.description}</p>}

          <div className="tracks-container">
            <h3>Tracks to Transfer ({tracks.length})</h3>
            {tracksLoading ? (
              <p className="loading">Loading tracks...</p>
            ) : tracks.length > 0 ? (
              <ul className="tracks-list">
                {tracks.map((track, index) => (
                  <li key={track.track.id || index} className="track-item">
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
              disabled={tracksLoading || tracks.length === 0 || loading}
            >
              {loading ? "Transferring..." : "Transfer to Apple Music"}
            </button>

            <button
              className="back-button"
              onClick={() => navigate("/playlists")}
            >
              Back to Playlists
            </button>
          </div>

          {transferStatus && (
            <div className="transfer-status">
              <p>{transferStatus}</p>
              {loading && <div className="loading-spinner"></div>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Transfer;
