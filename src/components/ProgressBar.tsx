import { useState, FC, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface ProgressBarProps {
  max: number;
  currentTime: number;
  onTimeChange: (newTime: number) => void;
  onPause: (isPaused: boolean) => void;
  onFavoriteAdd: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      marginTop: theme.spacing(0),
    },
    heartIcon: {
      color: "red",
      transition: "transform 0.3s ease-out",
      "&.liked": {
        transform: "scale(1.5)",
      },
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(0),
      top: "0",
    },
  })
);

const ProgressBar: FC<ProgressBarProps> = ({
  max,
  currentTime,
  onTimeChange,
  onPause,
  onFavoriteAdd,
}) => {
  const classes = useStyles();
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setDuration(max);
  }, [max]);

  useEffect(() => {
    let intervalId: number | undefined;

    if (!isPaused) {
      intervalId = setInterval(() => {
        onTimeChange(currentTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPaused, currentTime, onTimeChange]);

  const handlePause = () => {
    setIsPaused(!isPaused);
    onPause(!isPaused);
  };

  const handleFavoriteAdd = () => {
    onFavoriteAdd();
    setLiked(true);

    // Reset liked state after the animation duration
    setTimeout(() => {
      setLiked(false);
    }, 300);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div className={classes.root}>
      {/* Linear Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={(currentTime / duration) * 100}
        style={{ marginBottom: "10px" }}
      />

      {/* Slider for Time Control */}
      <Slider
        value={currentTime}
        min={0}
        max={duration}
        step={1}
        onChange={(_, value) => onTimeChange(value as number)}
      />

      {/* Playback Controls */}
      <div className={classes.controls}>
        {/* Play/Pause Button */}
        <IconButton onClick={handlePause} style={{ color: "white" }}>
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </IconButton>

        {/* Favorite Button with Heart Animation */}
        <IconButton onClick={handleFavoriteAdd}>
          <FavoriteIcon
            className={`${classes.heartIcon} ${liked ? "liked" : ""}`}
          />
        </IconButton>

        <p>{`${formatTime(currentTime)}/${formatTime(duration)}`}</p>
      </div>

      {/* Display current time and duration */}
    </div>
  );
};

export default ProgressBar;
