import { redirect } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { login, signUp } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css';

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }
  // validate user input
  try{
    if (authMode === 'login') {
      return await login(credentials);
    } else {
      return await signUp(credentials);
    }
  }catch(error){
    if(error.status === 422){
      return {
        credentials: error.message
      }
    }
    if(error.status === 401){
      return {
        credentials: error.message
      }
    }
  }
  console.log("did i reach here?");
  // return redirect("/");
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
