import React from 'react';
import { shallow } from 'enzyme';
import { GameState } from './GameState.js';

describe('GameState', () => {
  let defaultProps = {
    started: false,
    elixirs: 0,
    doubleElixirStarted: false,
    pumpIds: []
  }
  it('renders correctly', () => {
    const wrapper = shallow(<GameState {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});