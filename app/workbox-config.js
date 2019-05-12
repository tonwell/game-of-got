module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,ico,mp3,png,html,js,css,jpg}"
  ],
  "swSrc": "src/sw.js",
  "swDest": "build/sw.js",
  "maximumFileSizeToCacheInBytes": 3 * 1024 * 1024
};