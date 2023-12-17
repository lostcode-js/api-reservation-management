import { useUserStore } from "@/stores/userStores";

export default defineNuxtRouteMiddleware((to, from) => {
  /*
  const app = useNuxtApp();

  const userStore = useUserStore(app?.$pinia as any);
  console.log({ type: userStore.getUser, token: userStore.token, email: userStore.user?.email })

  switch (userStore.user.type) {
    case 'user':
      if(!to?.fullPath.includes('user')) {
        return navigateTo('/login');
      }
      break;
    case 'employee':
      if(!to?.fullPath.includes('employee')) {
        return navigateTo('/login');
      }
      break;
    case 'admin':
      if(!to?.fullPath.includes('admin')) {
        return navigateTo('/login');
      }
      break;
    default:
      break;
  }

  if ((!userStore.token && !userStore.user?.email)) {
    return navigateTo('/login');
  }*/
})
