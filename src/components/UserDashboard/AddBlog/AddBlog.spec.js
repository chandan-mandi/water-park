import { shallow } from 'enzyme';
import React from 'react';
import AddBlog from './AddBlog';

describe('<AddBlog />', () => {
	it('renders without crashing', () => {
		shallow(<AddBlog />);
	});
});