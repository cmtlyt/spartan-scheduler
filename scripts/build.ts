import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import nuxtConfig from '../nuxt.config';

const preset = process.env.NITRO_PRESET || nuxtConfig.nitro?.preset || 'node-server';

let baseUrl = './.output/server';

if (preset === 'vercel') {
  baseUrl = './.vercel/output/functions/__nitro.func';
}
else if (preset === 'netlify') {
  baseUrl = './.netlify/functions-internal/server';
}

const fromPath = path.resolve(process.cwd(), baseUrl, './node_modules/.prisma');

fs.renameSync(fromPath, path.resolve(baseUrl, './.prisma'));
