import type { Field } from "../components/common/FormsFields";

export const fieldsSearch: Field[] = [
  // 🔹 Busca geral
  {
    internalName: "search",
    label: "Busca Geral",
    type: "text",
    value: "",
    colSpan: 12,
  },

  // 🔹 Título original
  {
    internalName: "originalTitle",
    label: "Título Original",
    type: "text",
    value: "",
    colSpan: 12,
  },

  // 🔹 Diretor
  {
    internalName: "director",
    label: "Diretor",
    type: "text",
    value: "",
    colSpan: 6,
  },

  // 🔹 Idioma e país
  {
    internalName: "language",
    label: "Idioma",
    type: "text",
    value: "",
    colSpan: 3,
  },
  {
    internalName: "country",
    label: "País",
    type: "text",
    value: "",
    colSpan: 3,
  },

  // 🔹 Classificação indicativa
  {
    internalName: "indicativeRating",
    label: "Classificação Indicativa (≤)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  // 🔹 Período de lançamento
  {
    internalName: "releaseDateStart",
    label: "Lançamento (De)",
    type: "datetime",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "releaseDateEnd",
    label: "Lançamento (Até)",
    type: "datetime",
    value: "",
    colSpan: 6,
  },

  // 🔹 Duração
  {
    internalName: "minDuration",
    label: "Duração Mínima (min)",
    type: "number",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "maxDuration",
    label: "Duração Máxima (min)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  // 🔹 Orçamento
  {
    internalName: "minBudget",
    label: "Orçamento Mínimo ($)",
    type: "number",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "maxBudget",
    label: "Orçamento Máximo ($)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  // 🔹 Receita / Lucro
  {
    internalName: "minRevenue",
    label: "Receita Mínima ($)",
    type: "number",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "maxRevenue",
    label: "Receita Máxima ($)",
    type: "number",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "minProfit",
    label: "Lucro Mínimo ($)",
    type: "number",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "maxProfit",
    label: "Lucro Máximo ($)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  // 🔹 Rating médio
  {
    internalName: "minRatingAvg",
    label: "Nota Média Mínima",
    type: "number",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "maxRatingAvg",
    label: "Nota Média Máxima",
    type: "number",
    value: "",
    colSpan: 6,
  },

  // 🔹 Status e visibilidade
  {
    internalName: "status",
    label: "Status",
    type: "choice",
    options: ["DRAFT", "PUBLISHED"],
    value: "",
    colSpan: 6,
  },
  {
    internalName: "visibility",
    label: "Visibilidade",
    type: "choice",
    options: ["PRIVATE", "PUBLIC"],
    value: "",
    colSpan: 6,
  },

  // 🔹 Usuário responsável
  {
    internalName: "userId",
    label: "Usuário Responsável",
    type: "text",
    value: "",
    colSpan: 12,
  },

  // 🔹 Datas de criação
  {
    internalName: "createdAtStart",
    label: "Criado em (De)",
    type: "datetime",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "createdAtEnd",
    label: "Criado em (Até)",
    type: "datetime",
    value: "",
    colSpan: 6,
  },
];

export const fieldsCreateMovie: Field[] = [
  {
    internalName: "title",
    label: "Título",
    type: "text",
    value: "",
    required: true,
    colSpan: 12,
  },
  {
    internalName: "originalTitle",
    label: "Título Original",
    type: "text",
    value: "",
    colSpan: 12,
  },
  {
    internalName: "description",
    label: "Descrição",
    type: "text",
    value: "",
    colSpan: 12,
  },

  {
    internalName: "releaseDate",
    label: "Data de Lançamento",
    type: "datetime",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "duration",
    label: "Duração (minutos)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  {
    internalName: "imageUrl",
    label: "URL da Capa",
    type: "text",
    value: "",
    colSpan: 12,
  },
  {
    internalName: "linkPreview",
    label: "Link do Trailer/Teaser",
    type: "text",
    value: "",
    colSpan: 12,
  },

  {
    internalName: "actors",
    label: "Atores",
    type: "usermulti",
    value: [],
    colSpan: 12,
  },
  {
    internalName: "director",
    label: "Diretor",
    type: "user",
    value: "",
    colSpan: 12,
  },
  {
    internalName: "producers",
    label: "Produtores",
    type: "usermulti",
    value: [],
    colSpan: 12,
  },

  {
    internalName: "language",
    label: "Idioma",
    type: "text",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "country",
    label: "País",
    type: "text",
    value: "",
    colSpan: 6,
  },

  {
    internalName: "budget",
    label: "Orçamento (USD)",
    type: "number",
    value: "",
    colSpan: 4,
  },
  {
    internalName: "revenue",
    label: "Receita (USD)",
    type: "number",
    value: "",
    colSpan: 4,
  },
  {
    internalName: "profit",
    label: "Lucro (USD)",
    type: "number",
    value: "",
    colSpan: 4,
  },

  {
    internalName: "ratingAvg",
    label: "Avaliação Média (%)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  {
    internalName: "status",
    label: "Status",
    type: "choice",
    required: true,
    options: ["DRAFT", "PUBLISHED"],
    value: "",
    colSpan: 6,
  },
  {
    internalName: "visibility",
    label: "Visibilidade",
    type: "choice",
    required: true,
    options: ["PRIVATE", "PUBLIC"],
    value: "",
    colSpan: 6,
  },
];

export const fieldsEditMovie: Field[] = [
  {
    internalName: "title",
    label: "Título",
    type: "text",
    value: "",
    required: true,
    colSpan: 12,
  },
  {
    internalName: "originalTitle",
    label: "Título Original",
    type: "text",
    value: "",
    colSpan: 12,
  },
  {
    internalName: "description",
    label: "Descrição",
    type: "text",
    value: "",
    colSpan: 12,
  },

  {
    internalName: "releaseDate",
    label: "Data de Lançamento",
    type: "datetime",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "duration",
    label: "Duração (minutos)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  {
    internalName: "imageUrl",
    label: "URL da Capa",
    type: "text",
    value: "",
    colSpan: 12,
  },
  {
    internalName: "linkPreview",
    label: "Link do Trailer/Teaser",
    type: "text",
    value: "",
    colSpan: 12,
  },

  {
    internalName: "actors",
    label: "Atores",
    type: "usermulti",
    value: [],
    colSpan: 12,
  },
  {
    internalName: "director",
    label: "Diretor",
    type: "user",
    value: "",
    colSpan: 12,
  },
  {
    internalName: "producers",
    label: "Produtores",
    type: "usermulti",
    value: [],
    colSpan: 12,
  },

  {
    internalName: "language",
    label: "Idioma",
    type: "text",
    value: "",
    colSpan: 6,
  },
  {
    internalName: "country",
    label: "País",
    type: "text",
    value: "",
    colSpan: 6,
  },

  {
    internalName: "budget",
    label: "Orçamento (USD)",
    type: "number",
    value: "",
    colSpan: 4,
  },
  {
    internalName: "revenue",
    label: "Receita (USD)",
    type: "number",
    value: "",
    colSpan: 4,
  },
  {
    internalName: "profit",
    label: "Lucro (USD)",
    type: "number",
    value: "",
    colSpan: 4,
  },

  {
    internalName: "ratingAvg",
    label: "Avaliação Média (%)",
    type: "number",
    value: "",
    colSpan: 6,
  },

  {
    internalName: "status",
    label: "Status",
    type: "choice",
    required: true,
    options: ["DRAFT", "PUBLISHED"],
    value: "",
    colSpan: 6,
  },
  {
    internalName: "visibility",
    label: "Visibilidade",
    type: "choice",
    required: true,
    options: ["PRIVATE", "PUBLIC"],
    value: "",
    colSpan: 6,
  },
];
