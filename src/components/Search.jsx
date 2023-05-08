import {
    FormControl,
    OutlinedInput,
    FormLabel,
    FormHelperText,
    InputLabel,
    InputAdornment,
    Divider,
    IconButton,
    Chip,
    Fab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ search, setSearch }) {
    return (
        <FormControl sx={{ my: 1, width: "95%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
                Search
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={search}
                onInput={(e) => setSearch(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label="Search"
            />
        </FormControl>
    );
}
