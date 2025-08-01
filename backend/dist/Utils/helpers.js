"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayName = void 0;
exports.parseDateTime = parseDateTime;
function parseDateTime(dateStr, timeStr) {
    const [dd, mm, yyyy] = dateStr.split("-");
    const [time, period] = timeStr.split(" "); // "06:30", "AM"
    let [hours, minutes] = time.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hours !== 12)
        hours += 12;
    if (period.toUpperCase() === "AM" && hours === 12)
        hours = 0;
    return new Date(`${yyyy}-${mm}-${dd}T${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:00`);
}
const getDayName = (dateStr) => {
    const [dd, mm, yyyy] = dateStr.split("-");
    const date = new Date(`${yyyy}-${mm}-${dd}`);
    return date.toLocaleDateString("en-US", { weekday: "long" });
};
exports.getDayName = getDayName;
//# sourceMappingURL=helpers.js.map