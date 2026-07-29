import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Custom Vite plugin to handle /api/wishes read/write in Vite Dev Server mode
function wishesApiPlugin() {
  return {
    name: 'wishes-api-plugin',
    configureServer(server: any) {
      const wishesFile = path.resolve(__dirname, 'public/wishes.json');

      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/wishes' && req.method === 'GET') {
          try {
            const data = fs.readFileSync(wishesFile, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            return res.end(data);
          } catch (e) {
            return res.end(JSON.stringify([]));
          }
        }

        if (req.url === '/api/wishes' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const newWishData = JSON.parse(body);
              let current: any[] = [];
              if (fs.existsSync(wishesFile)) {
                current = JSON.parse(fs.readFileSync(wishesFile, 'utf-8'));
              }
              const newWish = {
                id: 'w_' + Date.now(),
                name: newWishData.name?.trim() || 'Sahabat',
                relation: newWishData.relation?.trim() || 'Sahabat',
                message: newWishData.message?.trim() || '',
                color: newWishData.color || '#FFE600',
                sticker: newWishData.sticker || '👑',
                date: 'Baru saja'
              };
              const updated = [newWish, ...current];
              fs.writeFileSync(wishesFile, JSON.stringify(updated, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify(updated));
            } catch (e) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ error: 'Failed to write wish' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), wishesApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
})
