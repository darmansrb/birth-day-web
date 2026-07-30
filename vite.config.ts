import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Custom Vite plugin to handle /api/wishes & /wishes.json read/write in Vite Dev Server mode
function wishesApiPlugin() {
  return {
    name: 'wishes-api-plugin',
    configureServer(server: any) {
      const publicWishesFile = path.resolve(__dirname, 'public/wishes.json');
      const distDir = path.resolve(__dirname, 'dist');
      const distWishesFile = path.resolve(__dirname, 'dist/wishes.json');

      const saveWishes = (wishes: any[]) => {
        const dataStr = JSON.stringify(wishes, null, 2);
        try {
          fs.writeFileSync(publicWishesFile, dataStr, 'utf-8');
        } catch (e) {
          console.error('Failed writing to public/wishes.json:', e);
        }
        try {
          if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
          }
          fs.writeFileSync(distWishesFile, dataStr, 'utf-8');
        } catch (e) {
          console.error('Failed writing to dist/wishes.json:', e);
        }
      };

      const readWishes = () => {
        try {
          if (fs.existsSync(publicWishesFile)) {
            return JSON.parse(fs.readFileSync(publicWishesFile, 'utf-8'));
          }
          if (fs.existsSync(distWishesFile)) {
            return JSON.parse(fs.readFileSync(distWishesFile, 'utf-8'));
          }
        } catch (e) {
          console.error('Error reading wishes:', e);
        }
        return [];
      };

      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = (req.url || '').split('?')[0];

        if ((url === '/api/wishes' || url === '/api/wishes/' || url === '/wishes.json') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache');
          return res.end(JSON.stringify(readWishes()));
        }

        if ((url === '/api/wishes' || url === '/api/wishes/' || url === '/wishes.json') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const newWishData = JSON.parse(body);
              const current = readWishes();
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
              saveWishes(updated);

              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify(updated));
            } catch (e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Failed to write wish' }));
            }
          });
          return;
        }

        if (url.startsWith('/api/wishes/') && req.method === 'DELETE') {
          const id = url.replace('/api/wishes/', '');
          try {
            const current = readWishes();
            const updated = current.filter((w: any) => w.id !== id);
            saveWishes(updated);

            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(updated));
          } catch (e) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: 'Failed to delete wish' }));
          }
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
