/** Форматирует цифры в вид `0XXX XXX XXX` (ведущий 0 и девять следующих цифр). */
export function formatPhoneMask(value: string): string {
    let digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length >= 1 && digits[0] !== "0") {
        digits = ("0" + digits).slice(0, 10);
    }
    if (digits.length === 0) {
        return "";
    }
    const a = digits.slice(0, 4);
    const b = digits.slice(4, 7);
    const c = digits.slice(7, 10);
    let out = a;
    if (b.length > 0) {
        out += " " + b;
    }
    if (c.length > 0) {
        out += " " + c;
    }
    return out;
}
