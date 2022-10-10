import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ClearIcon from "@mui/icons-material/Clear";

function FavPanel() {
  const [favs, setFavs] = React.useState([]);

  const getFavorites = () => {
    let favList = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      favList.push(key);
    }
    setFavs(favList);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const removeFavorite = (dog) => {
    localStorage.removeItem(dog);
    getFavorites();
  };

  return (
    <div className="container" sx={{ padding: 2 }}>
      <Stack sx={{ padding: 2 }} spacing={2} direction="row">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="warning" startIcon={<HomeIcon />}>
            Home
          </Button>
        </Link>
      </Stack>
      <Paper elevation={0} sx={{ padding: 2 }}></Paper>

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3, xl: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {favs.length == 0 && 
            <Typography variant='h6' sx={{ padding: 2 }}>
              No Favorites Found!
            </Typography>
          }
          {favs.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item}
                    alt={item}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="outlined"
                    size="small"
                    aria-label={item}
                    onClick={() => removeFavorite(item)}
                    startIcon={<ClearIcon sx={{ color: "red" }} />}
                  ></Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

        </Grid>
      </Box>
    </div>
  );
}

export default FavPanel;
