export const setLocalSelectedVenue = (venueObj) => {
  localStorage.setItem('selectedVenue', JSON.stringify(venueObj));
}

export const removeLocalSelectedVenue = () => {
  localStorage.removeItem('selectedVenue');
}