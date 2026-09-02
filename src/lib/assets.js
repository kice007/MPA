// Resolve an image copied into /public/assets (filenames keep spaces / emoji).
export const asset = (name) => `/assets/${encodeURIComponent(name)}`

// Named assets used across sections (verbatim filenames from design.pen).
export const IMG = {
  logo: asset('MPA_hair-Photoroom.png'),
  hero: asset('hero_adje.png'),
  founder: asset('founder.jpg'),
}
