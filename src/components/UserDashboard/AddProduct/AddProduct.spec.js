import { shallow } from 'enzyme';
import React from 'react';
import AddProduct from './AddProduct';

describe('<AddProduct />', () => {
	it('renders without crashing', () => {
		shallow(<AddProduct />);
	});
});