import * as log from 'https://deno.land/std@0.149.0/log/mod.ts';

import dayjs from 'https://cdn.skypack.dev/dayjs@1.11.4';
import weekday from 'https://cdn.skypack.dev/dayjs/plugin/weekday'
import weekOfYear from 'https://cdn.skypack.dev/dayjs/plugin/weekOfYear'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('DEBUG', {
      formatter: (log) =>
        `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${`[${log.levelName}]`.padEnd(10, ' ')
        } ${log.msg}`,
    }),
    file: new log.handlers.RotatingFileHandler('INFO', {
      filename: `./output/main.log`,
      maxBytes: 15,
      maxBackupCount: 5,
      formatter: (rec) =>
        JSON.stringify({
          region: rec.loggerName,
          ts: rec.datetime,
          level: rec.levelName,
          data: rec.msg,
        }),
    }),
  },
  loggers: {
    default: { level: 'DEBUG', handlers: ['console'] },
    file: { level: 'INFO', handlers: ['file'] },
  },
});