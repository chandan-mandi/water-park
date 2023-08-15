import { shallow } from 'enzyme';
import React from 'react';
import SendReview from './SendReview';

describe('<SendReview />', () => {
	it('renders without crashing', () => {
		shallow(<SendReview />);
	});
});