export function getNotificationLink(n) {
    if (n.type === "order_state") {
        return "/order/" + n.data;
    }
    return "#";
}
