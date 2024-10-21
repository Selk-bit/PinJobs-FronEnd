export function validateLink  (addressURL:string)  {
  // Trim any whitespace from the beginning or end of the string
  addressURL = addressURL.trim();

  // Replace spaces with '%20'
  addressURL = addressURL.replace(/\s/g, '%20');

  // Ensure the URL starts with a valid protocol (http or https)
  if (!/^https?:\/\//i.test(addressURL)) {
    addressURL = 'https://' + addressURL;
  }

  return addressURL;
}

