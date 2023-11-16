import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { BOOK_TYPE } from '../../../utils/constants';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/books/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/dashboard/all-books');
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  try {
    await customFetch.patch(`/books/${params.id}`,data);
    toast.success('könyv sikeresen szerkesztve');
    return redirect('/dashboard/all-books');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditBook = () => {
  const { book } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>könyv szerkesztése</h4>
        <div className='form-center'>
          <FormRow type='text' name='cím' defaultValue={book.cím} />
          <FormRow type='text' name='szerző' defaultValue={book.szerző} />
          <FormRow type='number' name='ISBN' defaultValue={book.ISBN} />
          <FormRow type='text' name='kiadó' defaultValue={book.kiadó} />
          <FormRow type='number' name='év' defaultValue={book.év} />
          <FormRow type='text' name='kategória' defaultValue={book.kategória} />
          <FormRow type='number' name='darabszám' defaultValue={book.darabszám} />
          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'küldés...' : 'küldés'}
          </button>

        </div>
      </Form>
    </Wrapper>
  );
};
export default EditBook;