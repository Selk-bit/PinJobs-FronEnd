export async function validateImage(addressURL: string, defaultImageURL: string) {
    // Trim any whitespace from the beginning or end of the string
    addressURL = addressURL.trim();

    // Replace spaces with '%20'
    addressURL = addressURL.replace(/\s/g, '%20');

    // Ensure the URL starts with a valid protocol (http or https)
    if (!/^https?:\/\//i.test(addressURL)) {
        addressURL = 'https://' + addressURL;
    }

    try {
        // Perform a HEAD request to check if the URL is accessible
        const response = await fetch(addressURL, { method: 'HEAD' });

        // If the response is not OK (e.g., 404), return the default image URL
        if (!response.ok) {
            console.warn(`URL is not accessible. Using default image URL: ${defaultImageURL}`);
            return defaultImageURL;
        }

        // Return the validated URL if accessible
        return addressURL;
    } catch (error) {
        console.error(`Error validating URL: ${addressURL}. Using default image URL: ${defaultImageURL}`);
        return defaultImageURL;
    }
}
