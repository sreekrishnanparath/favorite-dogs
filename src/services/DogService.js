import http from "../services/http-service"

export const getDogs = () => {
    return http.get("/woof.json",null)
}
