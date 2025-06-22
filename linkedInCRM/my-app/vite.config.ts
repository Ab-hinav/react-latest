import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'dashboard.html'),
                background: resolve(__dirname, 'src/background.ts'),
                contactScript: resolve(__dirname, 'src/contactScript.ts'),
                messagesScript: resolve(__dirname, 'src/MessagesScript.ts'),
                // db: resolve(__dirname, 'src/db.ts')
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        },
        outDir: 'dist',
        emptyOutDir: true

    },
    plugins: [
        {
            name: 'copy-static-file',
            closeBundle() {
                copyFileSync('manifest.json', 'dist/manifest.json');
            }
        },
        tailwindcss(),
    ]
});