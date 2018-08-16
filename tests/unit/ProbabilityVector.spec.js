import { expect } from "chai";
// import { shallowMount } from "@vue/test-utils";
// import HelloWorld from "@/components/HelloWorld.vue";
import _ from "lodash";
import ProbabilityVector from "@/lib/ProbabilityVector";

describe("ProbabilityVector", () => {
  it("normalizes properly", () => {
    let pv = new ProbabilityVector({ a: 1.5, b: 0.5 });
    let normalized = pv.normalize();
    let expected = new ProbabilityVector({ a: 1.5 / 2, b: 0.5 / 2 });
    expect(normalized).to.deep.equal(expected);
  });
});

// describe("HelloWorld.vue", () => {
//   it("renders props.msg when passed", () => {
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     });
//     expect(wrapper.text()).to.include(msg);
//   });
// });
