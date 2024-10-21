export function slugify(text: string) {
    return text
        .toString()                 // Convert to string
        .toLowerCase()              // Convert to lowercase
        .trim()                     // Trim whitespace from both ends
        .replace(/\s+/g, '-')       // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')   // Remove all non-word characters (letters, digits, hyphens, underscores)
        .replace(/\-\-+/g, '-');    // Replace multiple hyphens with a single hyphen
}