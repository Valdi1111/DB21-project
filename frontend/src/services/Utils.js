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

export function formatCreditCardType(type) {
    const cc = {
        visa: "Visa",
        mastercard: "Master Card",
        american_express: "American Express",
        discover: "Discover"
    }
    return cc[type];
}

export function formatCreditCard(type, number) {
    const cc = {
        visa: "Visa",
        mastercard: "Master Card",
        american_express: "American Express",
        discover: "Discover"
    }
    return cc[type] + ", ***" + number.substr(number.length - 3);
}

export function formatStreet(street, civic) {
    return street + ", " + civic;
}

export function formatCity(city, district, postal_code) {
    return city + " " + district + ", " + postal_code;
}
