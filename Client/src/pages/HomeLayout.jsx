import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';

const HomeLayout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};
export default HomeLayout;