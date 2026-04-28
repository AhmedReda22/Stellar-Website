// Type declarations for CSS imports.
// Next.js handles CSS bundling — this file just tells TypeScript to accept
// `import './globals.css'` without complaining.

declare module "*.css" {
  const styles: { [className: string]: string };
  export default styles;
}