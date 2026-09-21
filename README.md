# Vương Hỷ Khang — portfolio

Trang: https://kanglee079.github.io/

- `index.html` + `assets/` — bản đã build, GitHub Pages phục vụ trực tiếp từ nhánh `main`.
- `portfolio/` — mã nguồn (React, Vite, Tailwind, Framer Motion, Lenis). Nội dung ba ngôn ngữ nằm ở `portfolio/src/data.ts`.

Build lại:

```bash
cd portfolio && pnpm install && npx vite build && cp dist/index.html ../index.html
```
