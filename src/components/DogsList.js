import React from "react";
import { getDogs } from "../services/DogService";
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
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import { LoadingButton } from "@mui/lab";
import RefreshIcon from "@mui/icons-material/Refresh";


function DogsPanel() {
  const [dogs, setDogs] = React.useState([]);
  const [isloading, setIsLoading] = React.useState(false);

  const getDogList = async () => {
    (async () => {
      try {
        setIsLoading(true);
        let urllist = [];
        for (let i = 0; i < 6; i++) {
          const response = await getDogs();
          const data = response.status == 200 ? response.data : [];
          urllist.push(data);
        }
        setDogs(urllist);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const addFavorite = (dog) => {
    localStorage.setItem(dog, dog);
  };

  React.useEffect(() => {
    getDogList();
  }, []);

  return (
    <div className="container" sx={{ padding: 2 }}>
      <Stack sx={{ padding: 2 }} spacing={2} direction="row">
        <LoadingButton
          variant="contained"
          color="success"
          loading={isloading}
          loadingPosition="start"
          startIcon={<RefreshIcon />}
          onClick={() => getDogList()}
        >
          Refresh
        </LoadingButton>

        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => getDogList()}
            startIcon={<StarIcon sx={{ color: "white" }} />}
          >
            Favorites
          </Button>
        </Link>
      </Stack>

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3, xl: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {dogs.length == 0 && 
            <Typography variant='h6' sx={{ padding: 2 }}>
              No Pics Found!
            </Typography>
          }
          {dogs.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.url}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.url}
                    alt={item.url}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.url}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="outlined"
                    size="small"
                    aria-label={item.title}
                    onClick={() => addFavorite(item.url)}
                    startIcon={<StarIcon sx={{ color: "#F1C40F" }} />}
                  >
                    Favorite
                  </Button>
                </CardActions>
              </Card>

              {/* <img
                src={item.url}
                srcSet={item.url}
                alt={item.url}
                loading="lazy"
                sx={{ width: 500, height: 450 }}
              /> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default DogsPanel;
