/*
  Site content for Forest Green. Edit this file to update the website.
  Anything marked PLACEHOLDER should be replaced with real details.
*/
window.SITE_DATA = {
  // PLACEHOLDER: paste any open.spotify.com artist, album, playlist or track link,
  // e.g. "https://open.spotify.com/artist/XXXXXXXXXXXXXXXXXXXXXX".
  // Leave empty to show a placeholder box instead of the player.
  spotifyUrl: "",

  // Leave email empty to point people to Instagram DMs instead.
  contactEmail: "",

  // Links with an empty url are hidden. Order here is the order shown on the site.
  socials: [
    { platform: "instagram", label: "Instagram", handle: "@forestgreenmelb", url: "https://www.instagram.com/forestgreenmelb/" },
    { platform: "spotify", label: "Spotify", handle: "Listen on Spotify", url: "" }, // PLACEHOLDER
    { platform: "tiktok", label: "TikTok", handle: "", url: "" },
    { platform: "youtube", label: "YouTube", handle: "", url: "" },
    { platform: "facebook", label: "Facebook", handle: "", url: "" },
    { platform: "bandcamp", label: "Bandcamp", handle: "", url: "" },
  ],

  // Dates are YYYY-MM-DD. Shows before today move to "Past shows" automatically.
  // ticketUrl is optional; leave empty to show "Tickets soon".
  shows: [
    // PLACEHOLDER shows: replace with real dates.
    { date: "2026-12-12", venue: "Venue TBC", city: "Fitzroy, VIC", time: "Doors 8pm", note: "Placeholder date", ticketUrl: "" },
    { date: "2027-01-23", venue: "Venue TBC", city: "Brunswick, VIC", time: "Doors 7:30pm", note: "Placeholder date", ticketUrl: "" },
    { date: "2027-02-20", venue: "Venue TBC", city: "Collingwood, VIC", time: "", note: "Placeholder date", ticketUrl: "" },
    { date: "2026-09-19", venue: "bring what you're carrying", city: "Carlton, VIC", time: "", note: "", ticketUrl: "" },
  ],

  // Put photos in assets/images/. Photos fill the gallery left to right, top to bottom.
  // width and height are the photo's pixel size; they're optional but stop the page jumping while photos load.
  gallery: [
    { src: "assets/images/live-01.jpg", width: 1024, height: 682, alt: "Forest Green playing live to a packed room" },
    { src: "assets/images/singer-spotlight.jpg", width: 683, height: 1024, alt: "Singing under a green spotlight" },
    { src: "assets/images/bw-notes-between-songs.jpg", width: 682, height: 1024, alt: "A \"notes between songs\" card from bring what you're carrying" },
    { src: "assets/images/shirt-back-green-light.jpg", width: 1024, height: 682, alt: "Band shirt lit green on stage with the band playing behind" },
    { src: "assets/images/bw-gear-and-crowd.jpg", width: 682, height: 1024, alt: "Keys, guitars and pedals set up, with the crowd in Forest Green shirts" },
    { src: "assets/images/pointing-up.jpg", width: 682, height: 1024, alt: "Pointing skyward in warm stage light" },
    { src: "assets/images/keys-shirt-back.jpg", width: 683, height: 1024, alt: "Playing keys facing the crowd, shirt reading forest green, Sep 19th 2026, Carlton" },
    { src: "assets/images/dancing-after-the-set.jpg", width: 682, height: 1024, alt: "Dancing in Forest Green shirts" },
    { src: "assets/images/bw-door-list.jpg", width: 682, height: 1024, alt: "Clipboard in hand at the front counter" },
    { src: "assets/images/bw-merch-table.jpg", width: 1024, height: 682, alt: "The bring what you're carrying shirt at the merch table" },
    { src: "assets/images/keys-head-down.jpg", width: 1024, height: 683, alt: "Keys player with head down, deep in the song" },
    { src: "assets/images/bw-singer-and-crowd.jpg", width: 1024, height: 682, alt: "Singing to the seated crowd" },
    { src: "assets/images/conducting-pink-light.jpg", width: 682, height: 1024, alt: "Arms out, directing the band under pink light" },
    { src: "assets/images/band-from-behind.jpg", width: 1024, height: 682, alt: "The band from behind, facing the audience" },
    { src: "assets/images/band-group-photo.jpg", width: 1024, height: 683, alt: "The band and friends gathered behind the keys" },
    { src: "assets/images/arms-raised-green-light.jpg", width: 682, height: 1024, alt: "Arms raised to the band under green light" },
    { src: "assets/images/bw-door-list-2.jpg", width: 682, height: 1024, alt: "Checking the list at the front counter" },
    { src: "assets/images/bw-merch-shirt.jpg", width: 682, height: 1024, alt: "The show shirt draped over the merch table" },
  ],
};
