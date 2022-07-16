export function getNotificationLink(n) {
    if (n.type === "order_state") {
        return "/order/" + n.data;
    }
    return "#";
}

export function formatDateTime(instant) {
    const date = new Date(instant);
    const locale = "en-US";
    const opts = {day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "numeric"};
    return date.toLocaleDateString(locale, opts);
}

export function formatDate(instant) {
    const date = new Date(instant);
    const locale = "en-US";
    const opts = {day: "2-digit", month: "long", year: "numeric"};
    return date.toLocaleDateString(locale, opts);
}

export function formatPrice(price) {
    const locale = "en-US";
    const opts = {style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2};
    const formatter = new Intl.NumberFormat(locale, opts);
    return formatter.format(price);
}

export function formatDiscount(percentage) {
    const locale = "en-US";
    const opts = {style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1};
    const formatter = new Intl.NumberFormat(locale, opts);
    return formatter.format(percentage / 100);
}
