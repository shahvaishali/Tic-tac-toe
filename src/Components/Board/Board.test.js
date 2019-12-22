import React from "react";
import Board from "./board";
import { shallow, mount } from "enzyme";
it("renders without crashing", () => {
  let square = Array(9).fill(null);
  shallow(<Board square={square} blinker={[]}/>);
});

it('onClick event to get first index', () => {
  let square = Array(9).fill(null);
  const onClick = jest.fn();
  const wrapper = mount(<Board square={square} onClick={onClick} blinker={[]}/>)
  wrapper.find('div.square').first().simulate('click');
  expect(onClick).toBeCalledWith(0);
})