import { Button, TextField, Box } from "@mui/material"

export function AuthFormMUI({ type }) {
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 3 }}>
                <TextField label="Email" variant="outlined" fullWidth margin="normal" placeholder="Enter your email" />
            </Box>

            <Box sx={{ mb: 4 }}>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your password"
                />
            </Box>

            <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    py: 1.5,
                    bgcolor: "#10b981", // Green color to match FloraFlow theme
                    "&:hover": {
                        bgcolor: "#059669",
                    },
                }}
            >
                {type === "login" ? "Log in" : "Register"}
            </Button>
        </Box>
    )
}

