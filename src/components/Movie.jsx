import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    ButtonGroup,
    IconButton,
    Modal,
    Backdrop,
    Fade,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import AddMovie from "./AddMovie";
import { db, auth } from "../config/firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

export default function Movie({ movie, getMovieList, children }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteMovie = async (movie) => {
        const movieDoc = doc(db, "filmy", movie.id);
        await deleteDoc(movieDoc);
        getMovieList();
    };

    const updateSeen = async (movie) => {
        try {
            const movieDoc = doc(db, "filmy", movie.id);
            await updateDoc(movieDoc, { seen: !movie.seen });
            getMovieList();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Card variant="elevation" sx={{ width: "95%", my: 1 }}>
                <CardContent>
                    <Typography variant="h4">{movie.title}</Typography>
                    <Typography variant="body1">{movie.year}</Typography>
                </CardContent>
                <CardActions>
                    <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                        sx={{ width: "100%" }}
                    >
                        <Button
                            startIcon={<EditIcon />}
                            onClick={handleOpen}
                            sx={{
                                width: "20%",
                                "& .MuiButton-startIcon": { mx: "auto" },
                            }}
                        />
                        <Button
                            color={movie.seen ? "success" : "warning"}
                            onClick={() => updateSeen(movie)}
                            sx={{ width: "100%" }}
                        >
                            {movie.seen ? "Watched" : "To watch"}
                        </Button>

                        <Button
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => deleteMovie(movie)}
                            sx={{
                                width: "20%",
                                "& .MuiButton-startIcon": { mx: "auto" },
                            }}
                        />
                    </ButtonGroup>
                </CardActions>
            </Card>
            <AddMovie
                movie={movie}
                open={open}
                setOpen={setOpen}
                getMovieList={getMovieList}
            />
        </>
    );
}
