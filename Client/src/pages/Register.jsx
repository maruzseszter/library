// import { Logo, FormRow } from '../components';
// import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   return (
//     <Wrapper>
//       <form className='form'>
//         <Logo />
//         <h4>Regisztráció</h4>
//         <FormRow type='text' name='studentID' labelText='tanulói azonosító' /> 
//         <FormRow type='text' name='lastName' labelText='vezetéknév' />
//         <FormRow type='text' name='name' labelText='keresztnév' />
//         <FormRow type='email' name='email' />
//         <FormRow type='password' name='password' labelText='jelszó'/>
//         <button type='submit' className='btn btn-block'>
//           Regisztrálok
//         </button>
//         <p>
//           Már tag vagy?
//           <Link to='/login' className='member-btn'>
//             Belépés
//           </Link>
//         </p>
//       </form>
//     </Wrapper>
//   );
// };
// export default Register;


import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch.js';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Sikeres regisztráció');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Regisztráció</h4>
        <FormRow type='text' name='studentID' labelText='Tanulói azonosító' defaultValue='OM12345678901' />
        <FormRow type='text' name='lastname' labelText='Vezetéknév' defaultValue='Maruzs' />
        <FormRow type='text' name='firstname' labelText='Keresztnév' defaultValue='Eszter' />
        <FormRow type='email' name='email' labelText='Email' defaultValue='eszter@gmail.com' />
        <FormRow type='password' name='password' labelText='Jelszó' defaultValue='secret_123' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
        {isSubmitting ? 'submitting...' : 'regisztráció'}
        </button>
        <p>
          Már tag vagy? &nbsp;&nbsp;&nbsp;
          <Link to='/login' className='member-btn'>
            Belépek
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
