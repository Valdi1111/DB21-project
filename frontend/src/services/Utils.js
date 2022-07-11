export function getNotificationLink(n) {
    if (n.type === "order_state") {
        return "/orders/" + n.data;
    }
    return "#";
}
