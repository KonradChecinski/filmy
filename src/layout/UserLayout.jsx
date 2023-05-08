import { Box } from "@mui/material";
import AppBar from "../components/AppBar";

export default function UserLayout({ forceUpdate, children }) {
    return (
        <>
            <AppBar forceUpdate={forceUpdate} />
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 1,
                }}
            >
                {children}
            </Box>
        </>
    );
}
