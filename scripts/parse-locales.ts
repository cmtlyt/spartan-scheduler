import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { iife } from '@cmtlyt/base';
import fg from 'fast-glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootPath = path.resolve(__dirname, '../i18n');
const sourcePath = path.resolve(rootPath, 'locales-js');
const targetPath = path.resolve(rootPath, 'locales');

iife(async () => {
  const locales = await fg.glob(['*.js'], { absolute: true, cwd: sourcePath });

  const contentInfo = await Promise.all(locales.map(locale => import(locale).then(content => ({
    filename: path.basename(path.relative(sourcePath, locale), '.js'),
    content: JSON.stringify(content.default),
  }))));

  await Promise.all(contentInfo.map(({ filename, content }) => fs.writeFile(
    path.resolve(targetPath, `${filename}.json`),
    content,
    'utf-8',
    () => {
      console.log('[output]:> generate', filename, 'success!');
    },
  )));
});
