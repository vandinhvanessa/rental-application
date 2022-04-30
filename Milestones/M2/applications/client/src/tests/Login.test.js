import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ReactDOM from 'react-dom';
import Login from "../pages/Login";
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
test('Login Should Render', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div)
})

describe('Login Inputs', () => {
    /*test('Username login', async () => {
      const loginContainer = shallow(<Login/>)
      loginContainer.find('input[name="text"]').simulate('change', {target: {name: 'text', value: 'vanessa'}});
      expect(loginContainer.state('text')).toEqual('vanessa');
    })*/
    it('renders children when passed in', () => {
        const wrapper = shallow((
          <Login>
            <div className="loginContainer" />
          </Login>
        ));
        expect(wrapper.contains(<div className="loginContainer" />)).toBe();
      });
})