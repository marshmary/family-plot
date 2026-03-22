# Family Plot VN 🌳

**Family Plot VN** is an interactive 3D family tree visualizer built with React and Three.js. Upload GEDCOM files, explore genealogies in a force-directed 3D graph, and trace family relationships through time.

[![Live Demo](https://img.shields.io/badge/Demo-online-green)](https://family-plot.ohkaycomputer.com/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/0d037b30-989f-4085-8d35-1848d5196ded/deploy-status)](https://app.netlify.com/projects/family-plot/deploys)

---

## Quick Start

```bash
npm install
npm start
```

Open http://0.0.0.0:8080 in your browser.

---

## Features

- **3D Force-Directed Graph** — Nodes positioned by birth year create an interactive timeline
- **GEDCOM Import/Export** — Upload `.ged` or `.gedz` files from Ancestry, MyHeritage, FamilySearch, Gramps
- **Sample Trees** — 13 pre-loaded trees (Kennedy, Shakespeare, Tolkien, Greek gods, etc.)
- **Relationship Tracing** — Click any person to highlight ancestors, descendants, and spouses
- **Surname Filtering** — Filter by family name with color-coded highlighting
- **Edit Mode** — Add/edit people, relationships, and photos
- **Light/Dark Theme** — Toggle with persistent preference
- **Bilingual** — English and Vietnamese (Tiếng Việt)
- **PWA** — Installable as a standalone app with offline support

---

## Controls

| Desktop | Mobile |
|---------|--------|
| Left-drag: rotate | Tap: select |
| Right-drag: pan | Pinch: zoom |
| Scroll: zoom | Swipe: rotate / pan |

---

## Tech Stack

- React 18 + Vite
- Three.js + react-force-graph-3d
- d3-force-3d for physics simulation
- Zustand for state management
- i18next for localization
- Sass for styling

---

## Credits & Acknowledgments

This project is based on the original **Family Plot** by [oh-kay-blanket](https://github.com/oh-kay-blanket/family-plot).

Built with gratitude using their open-source foundation:
- [tmcw/parse-gedcom](https://github.com/tmcw/parse-gedcom) — GEDCOM parser
- [vasturiano/3d-force-graph](https://github.com/vasturiano/3d-force-graph) — 3D graph engine

---

## Security

### Dependency Audits

Run monthly or before releases:

```bash
npm run security:check
npm run deps:check
```

### Updating Dependencies

```bash
# Safe updates (within semver)
npm run deps:update

# Manual major updates (test thoroughly)
npm install react@latest three@latest
```

---

## Music 🎵

This project was crafted while listening to:

**【鳴潮/エイメス】\*Luna - Aria feat.ねんね**

[![Music](https://img.shields.io/badge/YouTube-jKBXJXUeAeE-red?logo=youtube)](https://youtu.be/jKBXJXUeAeE?si=QjH8C48odkgIwZM8)

---

## License

ISC License — see [LICENSE](LICENSE) for details.

---

**Discover Your Roots.** 🕵️
