export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event);
  const fip = getRequestIP(event, { xForwardedFor: true });
  const fp = await getRequestFingerprint(event, {
    ip: true,
    method: true,
    path: true,
    userAgent: true,
    xForwardedFor: true,
  });
  // eslint-disable-next-line no-console
  console.log(`[OUTPUT]:> ${event.method} ${event.path} (ip: ${ip}, fip: ${fip}, uid: ${event.context.userInfo?.userId}, fp: ${fp})`);
});
