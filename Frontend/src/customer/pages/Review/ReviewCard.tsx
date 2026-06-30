import Grid2 from "@mui/material/Grid";
import { Avatar, Box, IconButton, Rating } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";

const ReviewCard = () => {
  return (
    <div className="flex justify-between">
      <Grid2 container spacing={9}>
        <Grid2 size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              Z
            </Avatar>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">Yashu</p>
              <p className="opacity-70">26 April 2026</p>
            </div>
          </div>
          <Rating readOnly value={4.5} precision={0.5} />

          <p>Value for money product, great product</p>
          <img className="w-24 h-24 object-cover"
            src="https://m.media-amazon.com/images/I/814nbLFPd6L._SY500_.jpg"
            alt=""
          />
        </Grid2>
      </Grid2>
      <div>
         <IconButton>
            <Delete sx={{color:red[700] }}/>
        </IconButton>
      </div>
    </div>
  );
};

export default ReviewCard;
