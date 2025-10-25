## 🧱 Estrutura Inicial do Projeto

Este projeto foi iniciado com **React + TypeScript + TailwindCSS**, seguindo uma arquitetura modular e organizada desde o primeiro commit.  
A estrutura foi planejada para garantir escalabilidade, reutilização de componentes e padronização visual desde o início.

### 📂 Estrutura de Pastas

src/
├── components/
│ ├── layout/
│ │ ├── AppLayout.tsx
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ ├── movies/
│ │ ├── MoviesGrid.tsx
│ │ ├── MovieCard.tsx
│ │ ├── RatingCircle.tsx
│ │ ├── Pagination.tsx
│ ├── filters/
│ │ ├── FiltersModal.tsx
│ ├── common/
│ │ ├── SearchBar.tsx
│ │ ├── Button.tsx
│ │ ├── Modal.tsx
│ │ ├── Icon.tsx
├── pages/
│ ├── Home.tsx
│ ├── MovieDetails.tsx
│ ├── AddMovie.tsx
├── App.tsx
├── main.tsx

Essa estrutura foi definida para separar claramente:

- **layout/** → estrutura base (Header, Footer, AppLayout)
- **movies/** → componentes específicos de filmes
- **filters/** → modais e filtros dinâmicos
- **common/** → componentes genéricos e reutilizáveis (botões, modais, etc.)
- **pages/** → telas principais da aplicação

---

## 🎨 Configuração do TailwindCSS

O projeto utiliza **TailwindCSS** com configuração personalizada para refletir a paleta do Figma e suportar **modo claro/escuro**.

### ⚙️ Configuração base (`tailwind.config.js`)

```js
darkMode: "class",
theme: {
  extend: {
    colors: {

      primary: {
        DEFAULT: "#8B5CF6",
        50: "#F5EEFF",
        100: "#EDE3FF",
        200: "#D9C6FF",
        300: "#C4A8FF",
        400: "#A678FF",
        500: "#8B5CF6",
        600: "#7B4DE6",
        700: "#6B3DD6",
        800: "#5A2DC6",
        900: "#4A1DB6",
      },
      mauve: {
        DEFAULT: "#1A1523",
        50: "#F4F2F6",
        100: "#E6E2EB",
        200: "#C9C1D0",
        300: "#ADA6B7",
        400: "#8F8A9E",
        500: "#706F85",
        600: "#5A536C",
        700: "#433754",
        800: "#2D1B3B",
        900: "#1A1523",
      },
      background: {
        dark: "#0E0E0E",
        light: "#FFFFFF",
      },
      border: {
        subtle: "#F1E6FD",
        subtle20: "#F1E6FD30",
      },
      text: {
        primary: {
          dark: "#FFFFFF",
          light: "#1A1523",
        },
        secondary: {
          dark: "#B5B2BC",
          light: "#706F85",
        },
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
},

```
