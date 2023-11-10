import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
       <Form method='post' className='form'>
        <Logo />
        <h4>Belépés</h4>
        <FormRow type='email' name='email' defaultValue='eszter@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret_123' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting' : 'submit'}
        </button> 
        <p>
          Még nem vagy tag?
          <Link to='/register' className='member-btn'>
            Regisztrálok
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;