const SELF_URL = process.env.SELF_URL || '';

const NEXT_URL = `${process.env.NEXT_URL}/dl-admin`;

export default function startSelfPing() {
  setInterval(
    () => {
      fetch(SELF_URL)
        .then(() => {
          console.log(
            `[SELF-PING-BACK] Pinged self at ${new Date().toISOString()}`,
          );
        })
        .catch((e) => {
          console.log(`[SELF-PING-BACK] Ping failed:`, e);
        });
      fetch(NEXT_URL)
        .then(() => {
          console.log(
            `[SELF-PING-FRONT] Pinged self at ${new Date().toISOString()}`,
          );
        })
        .catch((e) => {
          console.log(`[SELF-PING-FRONT] Ping failed:`, e);
        });
    },
    12 * 60 * 1000,
  ); // кожні 12 хвилин
}
