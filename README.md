# Font Inspector

A small React app for inspecting fonts available in the current browser environment.

It supports two scan modes:

- Canvas fallback scan for a curated list of common web, system, CJK, and emoji fonts.
- Local Font Access API scan for browsers that can enumerate installed fonts with user permission.
- Interface languages: Simplified Chinese, Traditional Chinese, English, Korean, Japanese, and Spanish.
- SEO metadata, Open Graph/Twitter previews, structured data, and a no-JavaScript fallback.

## Run Locally

**Prerequisites:** Node.js and pnpm

1. Install dependencies:

   ```powershell
   pnpm install
   ```

2. Run the app:

   ```powershell
   pnpm run dev
   ```

3. Build for production:

   ```powershell
   pnpm run build
   ```
