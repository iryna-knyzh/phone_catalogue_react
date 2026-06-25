// Public assets must respect Vite's base path so they resolve both in dev
// (base "/") and on GitHub Pages (base "/phone_catalogue_react/").
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
