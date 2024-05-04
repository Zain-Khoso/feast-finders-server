export const CORS_CONFIG = {
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
    credential: true
}

export const INTERNAL_SERVER_ERROR = {
    status: false,
    message: "Internal server error"
}

export const REQUIRED_FIELDS_ERROR = {
    status: false,
    message: "Required fields are missing!"
}

export const ACCESS_DENIED_ERROR = {
    status: false,
    message: "Access denied!"
}

export const NO_USER_ERROR = {
    status: false,
    message: "No user found!"
}