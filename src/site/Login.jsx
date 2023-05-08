import UserLayout from "../layout/UserLayout";
import Button from "@mui/material/Button";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Box } from "@mui/material";

export default function Login({ forceUpdate }) {
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            forceUpdate();
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <UserLayout forceUpdate={forceUpdate}>
            <Box
                sx={{
                    height: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={signInWithGoogle}
                    sx={{ mt: "auto", mb: "auto" }}
                >
                    Log in <br />
                    with Google
                </Button>
            </Box>
        </UserLayout>
    );
}
