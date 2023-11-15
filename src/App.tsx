// App.tsx
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import FavoritesList from "./components/FavoritesList";
import ProgressBar from "./components/ProgressBar";
import PlayerComponent from "./components/PlayerComponent";
import { Favorite } from "./components/FavoritesList";

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [tl1, setTl1] = useState<string | null>(null);
  const [tl2, setTl2] = useState<string | null>(null);
  const [max1, setMax1] = useState<number>(1);
  const [max2, setMax2] = useState<number>(1);
  const [max, setMax] = useState<number>(1);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  useEffect(() => {
    if (max1 > max2) {
      setMax(max1);
    } else {
      setMax(max2);
    }
  }, [max1, max2]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        maxHeight: "100vh",
        minHeight: "100vh",
        height: "100vh",
        zIndex: 100,
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#36393f", // Discord background color
        color: "#fff", // Text color
      }}
    >
      <NavBar />

      <div
        style={{
          display: "flex",
          flex: 1,
          backgroundColor: "#2f3136",
          maxHeight: "calc(100vh - 10px)",
          minHeight: "100px",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#202225",
            zIndex: "2",
            maxHeight: "84vh",
          }}
        >
          <FavoritesList
            favorites={favorites}
            onAddFavorite={function (_newFavorite: Favorite): void {
              console.log("todo");
            }}
            onClearAll={function (): void {
              console.log("todo");
            }}
            setFavorites={setFavorites}
            onFavoriteClick={function (_favorite: Favorite): void {
              setTime(_favorite.time);
            }}
          />
        </div>

        <div
          style={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            background: "#292b2f",
          }}
        >
          <div style={{ flex: 1, background: "#2e3338" }}>
            <PlayerComponent
              currentTime={Number(time)}
              onSubtitleChange={(text) => {
                setTl1(text);
              }}
              onMaxTimeChange={(maxT) => {
                setMax1(maxT);
              }}
            />
          </div>
          <div style={{ flex: 1, background: "#202225" }}>
            <PlayerComponent
              currentTime={Number(time)}
              onSubtitleChange={(text) => {
                setTl2(text);
              }}
              onMaxTimeChange={(maxT) => {
                setMax2(maxT);
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          bottom: 0,
          zIndex: 10,
          background: "#202225",
          maxWidth: "100vw",
          width: "100%",
        }}
      >
        <ProgressBar
          max={max}
          currentTime={Number(time)}
          onTimeChange={(newTime) => setTime(newTime)}
          onPause={(isPaused) => console.log(isPaused)}
          onFavoriteAdd={() =>
            setFavorites([
              ...favorites,
              { time: time, text1: tl1 || "", text2: tl2 || "" },
            ])
          }
        />
      </div>
    </div>
  );
};
export default App;
