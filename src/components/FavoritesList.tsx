import { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./FavoritesList.css"; // Import the CSS file for styling
import { utils, writeFile } from "xlsx";

export interface Favorite {
  time: number;
  text1: string;
  text2: string;
}

interface FavoritesListProps {
  favorites: Favorite[];
  onAddFavorite: (newFavorite: Favorite) => void;
  onClearAll: () => void;
  setFavorites: (favorites: Favorite[]) => void;
  onFavoriteClick: (favorite: Favorite) => void;
}

const FavoritesList = ({
  favorites,
  setFavorites,
  onClearAll,
  onFavoriteClick,
}: FavoritesListProps) => {
  useEffect(() => {
    setFavorites(favorites);
  }, [favorites]);

  const handleClearAll = () => {
    onClearAll();
    setFavorites([]);
  };

  const handleExport = () => {
    const data = favorites.map(({ text1, text2 }) => [text1, text2]);
    const ws = utils.aoa_to_sheet([...data]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Favorites");
    writeFile(wb, "favorites.xlsx");
  };

  const onRemoveFavorite = (favoriteitm: Favorite) => {
    const newFavorites = favorites.filter(
      (favorite) => favorite !== favoriteitm
    );
    setFavorites(newFavorites);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}
    >
      <h2>Favorites</h2>
      <button onClick={handleClearAll}>Clear all</button>
      <button onClick={handleExport}>Export</button>
      <ul
        style={{ listStyleType: "none", padding: 0, flex: 1 }}
        className="favorite-list"
      >
        {favorites.map((favorite, index) => (
          <li key={index}>
            <div className="favorite-box" style={{ border: "1px solid #000" }}>
              <div className="favorite-time">
                {new Date(favorite.time * 1000).toISOString().substr(11, 8)}
              </div>
              <div className="favorite-text1">{favorite.text1}</div>
              <div className="favorite-text2">{favorite.text2}</div>
              <div
                className="favorite-overlay"
                onClick={() => onFavoriteClick(favorite)}
              ></div>
              <button
                className="favorite-delete"
                onClick={() => onRemoveFavorite(favorite)}
              >
                <DeleteOutlineIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
