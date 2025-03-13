import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const fromPath = path.resolve(process.cwd(), './.output/server/node_modules/.prisma');

fs.renameSync(fromPath, path.resolve(fromPath, '../../.prisma'));
