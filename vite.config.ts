/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vite/client" />
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});
