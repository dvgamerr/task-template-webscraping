import puppeteer from 'https://deno.land/x/puppeteer@14.1.1/mod.ts';
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import * as log from 'https://deno.land/std@0.149.0/log/mod.ts';

const isDev = Deno.env.get('ENV') !== 'production';
log.debug('Puppeteer create launcher...');
const browser = await puppeteer.launch({
  headless: !isDev,
  args: isDev
    ? ['--fast-start', '--no-sandbox']
    : ['--no-sandbox', '--disable-setuid-sandbox', '--headless', '--disable-gpu'],
});

// Major Cineplex
log.debug('New page `https://www.google.co.th/`');
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 990 });
await page.goto('https://www.google.co.th/');
await page.waitForTimeout(10000);
await browser.close()