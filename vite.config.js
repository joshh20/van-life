import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { basename } from './config';

export default defineConfig({
	base: basename,
	plugins: [react()]
});