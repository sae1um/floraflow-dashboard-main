import { Link } from "react-router-dom"
import { Leaf } from "lucide-react"
import { Box, Typography, Paper, Container, Link as MuiLink } from "@mui/material"
import { AuthFormMUI } from "../../components/auth-form"

export default function LoginPage() {
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
                            Welcome back
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Enter your credentials to access your account
                        </Typography>
                    </Box>

                    <AuthFormMUI type="login" />

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#10b981] no-underline hover:underline"
                            >
                                Register here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}

