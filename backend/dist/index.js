"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./Config/db.config");
const user_routes_1 = __importDefault(require("./Routers/user.routes"));
const cors_1 = __importDefault(require("cors"));
const movie_routes_1 = __importDefault(require("./Routers/movie.routes"));
const cinema_routes_1 = __importDefault(require("./Routers/cinema.routes"));
const screen_routes_1 = __importDefault(require("./Routers/screen.routes"));
const show_routes_1 = __importDefault(require("./Routers/show.routes"));
const coupon_routes_1 = __importDefault(require("./Routers/coupon.routes"));
const booking_routes_1 = __importDefault(require("./Routers/booking.routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_middleware_1 = __importDefault(require("./Middlewares/errorHandler.middleware"));
dotenv_1.default.config();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const port = 3000;
app.get("/", (req, res) => {
    res.json({
        message: "i am working",
    });
});
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/movies", movie_routes_1.default);
app.use("/api/v1/cinemas", cinema_routes_1.default);
app.use("/api/v1/screens", screen_routes_1.default);
app.use("/api/v1/shows", show_routes_1.default);
app.use("/api/v1/bookings", booking_routes_1.default);
app.use("/api/v1/coupons", coupon_routes_1.default);
app.use("/", errorHandler_middleware_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map