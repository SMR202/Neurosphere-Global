# Bundled website fonts

These WOFF2 files are the same font assets previously fetched by `next/font/google`, retained from the successful production build. They are now loaded with `next/font/local` to avoid the Turbopack Google-font query failure during development and to make font compilation independent of network access.

- Cormorant Garamond: Latin subset, regular 400.
- Manrope: Latin subset, variable 200–800.
- Noto Naskh Arabic: Arabic subset, variable file used at 400–600.

Each family is distributed under the SIL Open Font License; its upstream license is included alongside the font. Keep these assets and licenses in source control.
