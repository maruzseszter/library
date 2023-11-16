import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
//import { BOOK_STATUS, BOOK_TYPE } from '../../../utils/constants';
import { BOOK_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/books', data);
    toast.success('Book added successfully');
    return redirect('all-books');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddBook = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Könyv hozzáadása</h4>
        <div className='form-center'>
          <FormRow type='text' name='cím' />
          <FormRow type='text' name='szerző' />
          <FormRow type='number' name='ISBN' />
          <FormRow type='text' name='kiadó' />
          <FormRow type='number' name='év' />
          <FormRowSelect
            labelText='kategória'
            name='kategória'
            list={Object.values(BOOK_TYPE)}
          />
          <FormRow type='number' name='darabszám' />
          {/* <FormRowSelect
            labelText='book status'
            name='bookStatus'
            defaultValue={BOOK_STATUS.NEW}
            list={Object.values(BOOK_STATUS)}
          /> */}

          <button
            type='submit'
            className='btn btn-block form-btn '
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Küldés...' : 'Küldés'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddBook;
