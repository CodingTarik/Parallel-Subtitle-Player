import React, { useState, useEffect, useId } from "react";
import SrtParser from "srt-parser-2";
import { Typography, Button } from "@mui/material";

interface Subtitle {
  id: string;
  startTime: string;
  startSeconds: number;
  endTime: string;
  endSeconds: number;
  text: string;
}

interface PlayerComponentProps {
  currentTime: number;
  onSubtitleChange: (text: string | null) => void;
  onMaxTimeChange: (maxTime: number) => void;
}

const PlayerComponent: React.FC<PlayerComponentProps> = ({
  currentTime,
  onSubtitleChange,
  onMaxTimeChange,
}) => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const srtContent = event.target?.result as string;
      const parser = new SrtParser();
      const parsedSubtitles = parser.fromSrt(srtContent);
      setSubtitles(parsedSubtitles);

      // Calculate and send the maximum time to the parent component
      const maxTime = parsedSubtitles.reduce(
        (max, subtitle) => Math.max(max, subtitle.endSeconds),
        0
      );
      onMaxTimeChange(maxTime);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    // Update the current subtitle based on the currentTime
    const currentSubtitleObj = subtitles.find(
      (subtitle) =>
        currentTime >= subtitle.startSeconds &&
        currentTime <= subtitle.endSeconds
    );

    if (currentSubtitleObj) {
      setCurrentSubtitle(currentSubtitleObj.text);
      // Send the current subtitle text to the parent component
      onSubtitleChange(currentSubtitleObj.text);
    } else {
      setCurrentSubtitle(null);
      // Send null when no subtitle is found
      onSubtitleChange(null);
    }
  }, [currentTime, subtitles, onSubtitleChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      handleFileUpload(file);
    }
  };

  const Id = useId();

  return (
    <div>
      <div>
        {/* Add a Material-UI button for selecting and uploading SRT file */}
        <input
          type="file"
          accept=".srt"
          id={Id}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor={Id}>
          <Button variant="contained" component="span">
            Select and Upload SRT File
          </Button>
        </label>
      </div>
      {/* Display the current subtitle with fade-in animation */}
      <Typography
        variant="h3"
        sx={{
          opacity: currentSubtitle ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          textAlign: "center",
          padding: "16px",
        }}
      >
        {currentSubtitle}
      </Typography>
    </div>
  );
};

export default PlayerComponent;
