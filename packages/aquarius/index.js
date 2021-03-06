import Sentry from '@aquarius-bot/sentry';
import debug from 'debug';
import timber from 'timber';

const log = debug('Host');

async function initialize() {
  try {
    log('Loading Bot');
    await import('./src/aquarius.js');

    log('Starting Server');
    await import('./web/server.js');
  } catch (error) {
    log(error);
    Sentry.captureException(error);
  }
}

if (process.env.TIMBER_KEY && process.env.NODE_ENV !== 'development') {
  const transport = new timber.transports.HTTPS(process.env.TIMBER_KEY);
  timber.install(transport);
  log('Timber Activated');
}

initialize();
