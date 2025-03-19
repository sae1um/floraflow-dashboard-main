import { Button, TextField, Box } from "@mui/material"
import { useState } from "react"
// import { useLogin, useRegister } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

export function AuthFormMUI({ type }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("")

    // const {login, isLoginLoading, loginError} = useLogin();
    // const {register, isRegisterLoading, registerError} = useRegister();
    // const navigate = useNavigate();
    /*
    const submitForm = async () => {
        setEmail(email.trim());
        setPassword(password.trim());
        if(type === "login"){
            const response = await login(email, password);
            // console.log(response)
            if(response.response){
                setError(response.response);
                return;
            }
            setUser(response.user);
            navigate("/");
        }
        if(type === "register"){
            const response = await register(userName, email, password);
            if(response.response === "User registered successfully"){
                setUser(response.user);
                navigate("/");
                return;
            }else if(response.response){
                setError(response.response);
                return;
            }
        }
    }*/

    return (
        <Box sx={{ width: "100%" }}>
            {type === "register" ? <Box sx={{ mb: 1 }}>
                <TextField 
                    label="Username" 
                    variant="outlined" 
                    fullWidth 
                    autoFocus
                    margin="normal" 
                    placeholder="Create a username" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </Box> : ""}

            <Box sx={{ mb: 1 }}>
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    fullWidth 
                    margin="normal" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>

            <Box sx={{ mb: 4 }}>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    py: 1.5,
                    bgcolor: "#10b981",
                    "&:hover": {
                        bgcolor: "#059669",
                    },
                }}
                // loading={}
                // disabled={isLoginLoading ? true : isRegisterLoading ? true : false}
                // onClick={() => submitForm()}
            >
                {type === "login" ? "Log in" : "Register"}
            </Button>
            {/* <div>
                {
                    loginError ? <p className="text-red-600">{loginError}</p> 
                        :
                    registerError ? <p className="text-red-600">{registerError}</p>
                        :
                    error ? <p className="text-red-600">{error}</p> : ""
                } 
            </div> */}
        </Box>
    )
}

