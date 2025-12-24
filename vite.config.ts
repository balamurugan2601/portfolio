import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // REPO_NAME should be replaced with your repository name if not using a custom domain or user page
    // e.g. base: '/my-portfolio/',
    base: '/',
})
