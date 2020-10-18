import User from "../database/models/User";
import orphanagesView from "./orphanages_view";

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            orphanages: user.orphanages
        }
    }
}