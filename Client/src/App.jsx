import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddBook,
  Stats,
  AllBooks,
  Profile,
  Admin,
  EditBook,
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addBookAction } from './pages/AddBook';
import { loader as allBooksLoader } from './pages/AllBooks';
import { loader as editBookLoader } from './pages/EditBook';
import { action as editBookAction } from './pages/EditBook';
import { action as deleteBookAction } from './pages/DeleteBook';
// import { loader as adminLoader } from './pages/Admin';

export const checkDefaultTheme = () => {
  const isDarkTheme =
    localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddBook />,
            action: addBookAction,
          },
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'all-books',
            element: <AllBooks />,
            loader: allBooksLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
            // loader: adminLoader,
          },
          {
            path: 'edit-book/:id',
            element: <EditBook />,
            loader: editBookLoader,
            action: editBookAction,
          },
          {
            path: 'delete-book/:id', action: deleteBookAction
          },
        ]
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;