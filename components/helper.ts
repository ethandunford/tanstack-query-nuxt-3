
export function getResultIcon(status: string) {
    if (status === "error") {
        return "❌";
    } else if (status === "success") {
        return "✔️";
    }
    return "";
}

export function getResultMessage(status: string) {
    if (status === "error") {
        return "Value is invalid or a odd number";
    } else if (status === "success") {
        return "Value is a even number";
    }
    return "";
}