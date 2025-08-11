"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = exports.getDayName = void 0;
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
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
};
exports.parseDate = parseDate;
//# sourceMappingURL=dateUtils.js.map