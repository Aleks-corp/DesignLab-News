const SELF_URL =
  process.env.SELF_URL || 'https://uxnews-yourapp.onrender.com/ping';

export default function startSelfPing() {
  setInterval(
    () => {
      fetch(SELF_URL)
        .then(() => {
          console.log(`[SELF-PING] Pinged self at ${new Date().toISOString()}`);
        })
        .catch((e) => {
          console.log(`[SELF-PING] Ping failed:`, e);
        });
    },
    12 * 60 * 1000,
  ); // кожні 12 хвилин
}
