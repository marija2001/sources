import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://api.sourcesllc.com/api",
    issuerBaseURL: "https://dev-03ifqltxbr6nn0hn.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck