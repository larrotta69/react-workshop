import React from 'react'
import Counter from '../components/counter'

import { shallow, mount, render } from 'enzyme'
import renderer from 'react-test-renderer';

describe('Counter component', () => {

  it('Matches the snapshot', () => {
    const tree = renderer.create(<Counter />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('Start with a count of 0', () => {
    const wrapper = shallow(<Counter />)
    const text = wrapper.find('p').text()
    expect(text).toEqual('Current count: 0')
  })

  it('Can increment the count when the button is clicked', () => {
    const wrapper = shallow(<Counter />)
    const incrementBtn = wrapper.find('button')
    incrementBtn.simulate('click')
    const text = wrapper.find('p').text()
    expect(text).toEqual('Current count: 1')
  })
});
