import UserLayout from "../layout/UserLayout";
import { db, auth } from "../config/firebase";
import {
    getDocs,
    collection,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    orderBy,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import Movie from "../components/Movie";
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
import AddIcon from "@mui/icons-material/Add";
import AddMovie from "../components/AddMovie";
import Search from "../components/Search";

export default function Movies({ forceUpdate }) {
    const [watchedMovieList, setWatchedMovieList] = useState([]);
    const [toWatchMovieList, setToWatchMovieList] = useState([]);

    const [search, setSearch] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => setOpenAddModal(true);

    const moviesCollectionRef = collection(db, "filmy");
    let moviesCollectionRef2;
    if (search.length > 3) {
        moviesCollectionRef2 = query(
            moviesCollectionRef,
            where("uid", "==", auth.currentUser.uid),
            where("titleLowerCase", ">=", search.toLocaleLowerCase()),
            where(
                "titleLowerCase",
                "<=",
                search.toLocaleLowerCase() + "\uf8ff"
            ),
            orderBy("titleLowerCase", "asc"),
            orderBy("year", "desc")
        );
    } else {
        moviesCollectionRef2 = query(
            moviesCollectionRef,
            where("uid", "==", auth.currentUser.uid),
            orderBy("year", "desc")
        );
    }

    const getMovieList = async () => {
        try {
            const data = await getDocs(moviesCollectionRef2);
            const filteredData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setWatchedMovieList(
                filteredData.filter((movie) => {
                    return movie.seen == true;
                })
            );

            setToWatchMovieList(
                filteredData.filter((movie) => {
                    return movie.seen == false;
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovieList();
    }, []);

    useEffect(() => {
        getMovieList();
    }, [search]);

    return (
        <UserLayout forceUpdate={forceUpdate}>
            <Search search={search} setSearch={setSearch} />
            <Divider flexItem={true} sx={{ my: 2 }}>
                <Chip label="To Watch" color="warning" />
            </Divider>
            {toWatchMovieList.map((movie, index) => {
                return (
                    <Movie
                        key={movie.id}
                        movie={movie}
                        getMovieList={getMovieList}
                    />
                );
            })}
            <Divider flexItem={true} sx={{ my: 2 }}>
                <Chip label="Watched" color="success" />
            </Divider>

            {watchedMovieList.map((movie, index) => {
                return (
                    <Movie
                        key={index}
                        movie={movie}
                        getMovieList={getMovieList}
                    />
                );
            })}
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: "fixed",
                    bottom: 15,
                    right: 15,
                }}
                onClick={handleOpenAddModal}
            >
                <AddIcon />
            </Fab>
            <AddMovie
                open={openAddModal}
                setOpen={setOpenAddModal}
                getMovieList={getMovieList}
            />
        </UserLayout>
    );
}
