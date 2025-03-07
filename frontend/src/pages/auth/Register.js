import { Link } from "react-router-dom"
import { Leaf } from "lucide-react"
import { Box, Typography, Paper, Container } from "@mui/material"
import { AuthFormMUI } from "../../components/auth-form"

export default function RegisterPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <Link
                to="/"
                style={{
                    position: "absolute",
                    top: "2rem",
                    left: "2rem",
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                <Leaf className="h-6 w-6 text-green-500 mr-2" />
                <Typography variant="h6" fontWeight="bold">
                    FloraFlow
                </Typography>
            </Link>

            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ mb: 3, textAlign: "center" }}>
                        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                            Create an account
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Enter your details to get started with FloraFlow
                        </Typography>
                    </Box>

                    <AuthFormMUI type="register" />

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#10b981] no-underline hover:underline"
                            >
                                Log in here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

