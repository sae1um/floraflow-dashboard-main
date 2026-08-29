/**
 * Device identifier helpers.
 *
 * A valid greenhouse device ID looks like `GH-XXXXXXXXXXXX`: the literal prefix
 * `GH`, a hyphen, then exactly 12 characters.
 */

/** Strip every embedded NUL byte (devices occasionally send trailing `\x00`). */
export function stripNullBytes(id: string): string {
    return id.replace(/\x00/g, "");
}

/** True when `id` matches the `GH-` + 12-character format. */
export function isValidDeviceId(id: string): boolean {
    const [prefix, body] = id.split("-");
    if (prefix !== "GH") return false;
    if (!body || body.length !== 12) return false;
    return true;
}
