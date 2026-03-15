export default defineEventHandler((event) => {
  return sendRedirect(event, "/characters", 301);
});
