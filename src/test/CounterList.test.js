import React from 'react'
import CounterList from '../components/CounterList';
import { shallow, mount } from 'enzyme';

describe('CounterList component', () => {
  it('Should render two counters by default', () => {
    const wrapper = shallow(<CounterList/>);
    const counters = wrapper.find('Counter');

    expect(counters.length).toEqual(2);
  })

  it('Can add more counters by clicking the button', () => {
    const wrapper = shallow(<CounterList/>);
    const btn = wrapper.find('button');
    btn.simulate('click');

    const counters = wrapper.find('Counter');

    expect(counters.length).toEqual(3);
  })

});
