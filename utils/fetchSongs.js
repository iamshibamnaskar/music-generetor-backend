require('dotenv').config();
const fetch = require('node-fetch');

const API_KEY = process.env.SECRET;

async function getMusicByMoodGenre(mood, genre) {
  const baseUrl = 'https://freesound.org/apiv2/search/text/';
  const query = encodeURIComponent(`${mood} ${genre}`);
  const url = `${baseUrl}?query=${query}&filter=duration:[5 TO 60]&fields=name,previews,url&token=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Freesound API returned status ${res.status}`);
  }

  const data = await res.json();

  const validResults = data.results.filter(item => item.previews && item.previews['preview-hq-mp3']);

  return validResults.slice(0, 3).map(item => ({
    name: item.name,
    previewUrl: item.previews['preview-hq-mp3'],
    freesoundUrl: item.url,
    mood,
    genre
  }));
}

module.exports = getMusicByMoodGenre;
