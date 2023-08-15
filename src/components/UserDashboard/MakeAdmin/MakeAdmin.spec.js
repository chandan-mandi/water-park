import { shallow } from 'enzyme';
import React from 'react';
import MakeAdmin from './MakeAdmin';

describe('<MakeAdmin />', () => {
	it('renders without crashing', () => {
		shallow(<MakeAdmin />);
	});
});