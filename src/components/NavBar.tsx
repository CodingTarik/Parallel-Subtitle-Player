import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Badge,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const NavBar: React.FC = () => {
  const [starsCount, setStarsCount] = useState<number | null>(null);
  const [imprintDialogOpen, setImprintDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch GitHub stars count
    const fetchStarsCount = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/CodingTarik/Parallel-Subtitle-Player"
        );
        const data = await response.json();
        setStarsCount(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    };

    fetchStarsCount();
  }, []);

  const handleImprintButtonClick = () => {
    setImprintDialogOpen(true);
  };

  const handleImprintDialogClose = () => {
    setImprintDialogOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ borderBottom: "1px solid #424242", backgroundColor: "#36393f" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Parallel Subtitle Player
          </Typography>
          <div style={{ margin: "5px", marginTop: "5px" }}>
            <Link color="inherit" href="https://codingtarik.github.io">
              Blog
            </Link>
          </div>
          <Tooltip title={`GitHub Stars: ${starsCount}`} arrow>
            <Link
              href="https://github.com/CodingTarik/Parallel-Subtitle-Player"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <StarIcon sx={{ marginRight: 0.5 }} />
              <Badge badgeContent={starsCount} color="primary">
                Stars
              </Badge>
            </Link>
          </Tooltip>
          <div style={{ margin: "5px", marginTop: "10px" }}>
            <Button color="inherit" onClick={handleImprintButtonClick}>
              Imprint
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Imprint Dialog */}
      <Dialog open={imprintDialogOpen} onClose={handleImprintDialogClose}>
        <DialogTitle>Imprint</DialogTitle>
        <DialogContent>
          {/* Add your imprint information here */}
          <Typography>
            Angaben gemäß § 5 TMG <br /> Tarik Azzouzi
            <br /> Nieder-Ramstädter-Straße 187
            <br />
            64285 Darmstadt
            <br /> Kontakt <br />
            Telefon: +49 1590 2299884 <br />
            E-Mail: BlogCodingTarik@web.de <br />
            Quelle: https://www.e-recht24.de
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImprintDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavBar;
