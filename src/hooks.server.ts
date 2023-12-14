import { redirect } from "@sveltejs/kit";
import { isLoggedIn } from './stores/client';


/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {

  if (isLoggedIn && event.route.id?.startsWith("/(app)/(protected)")) {
    throw redirect(302, "/login");
  }

  const response = await resolve(event);
  return response;
};