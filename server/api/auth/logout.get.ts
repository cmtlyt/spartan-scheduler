export default defineEventHandler(async (event) => {
  await clearSessionInfo(event);
  return sendRedirect(event, '/auth?clearUserInfo=true');
});
