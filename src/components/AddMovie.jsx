import {
    Modal,
    Backdrop,
    Fade,
    Box,
    FormControl,
    OutlinedInput,
    InputLabel,
    Button,
    Typography,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { db, auth } from "../config/firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

export default function AddMovie({
    movie,
    open,
    setOpen,
    getMovieList,
    children,
}) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [title, setTitle] = useState(movie ? movie.title : "");
    const [year, setYear] = useState(movie ? movie.year : "");

    const moviesCollectionRef = collection(db, "filmy");

    const onSubmitMovie = async () => {
        if (movie) {
            try {
                const movieDoc = doc(db, "filmy", movie.id);
                await updateDoc(movieDoc, { title: title, year: year });
                getMovieList(), handleClose();
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                await addDoc(moviesCollectionRef, {
                    title: title,
                    titleLowerCase: title.toLocaleLowerCase(),
                    year: year,
                    seen: false,
                    uid: auth.currentUser.uid,
                });
                getMovieList(), handleClose();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign={"center"}
                        sx={{ mb: 3 }}
                    >
                        Add Movie
                    </Typography>
                    <FormControl
                        sx={{ my: 2, width: "95%" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-name">
                            Name
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-name"
                            type="text"
                            value={title}
                            onInput={(e) => setTitle(e.target.value)}
                            label="Name"
                        />
                    </FormControl>
                    <FormControl
                        sx={{ my: 2, width: "95%" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-year">
                            Release date
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-year"
                            type="number"
                            InputProps={{
                                min: 1950,
                                max: 2050,
                            }}
                            value={year}
                            onInput={(e) => setYear(e.target.value)}
                            label="Release date"
                        />
                    </FormControl>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon />}
                        sx={{ width: "95%", height: 50, mt: 3 }}
                        onClick={onSubmitMovie}
                    >
                        Save
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
}
