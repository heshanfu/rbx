import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { Tab } from "src/components/tabs/tab";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = Tab;
const COMPONENT_NAME = "Tab";
const DEFAULT_ELEMENT = "a";
const BULMA_CLASS_NAME = undefined;

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapper = (node: JSX.Element) => Enzyme.shallow(node);

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
) => {
  const rootWrapper = makeShallowWrapper(node);
  const forwardRefWrapper = rootWrapper.children();
  const themeContextConsumerWrapper = forwardRefWrapper.dive();
  const ThemeContextConsumerChildren = (themeContextConsumerWrapper.props() as {
    children: React.FC<ThemeContextValue>;
  }).children;

  return Enzyme.shallow(
    <ThemeContextConsumerChildren {...themeContextValue} />,
  );
};

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("root", () => {
    it("should be li element", () => {
      const node = makeNode({});
      const wrapper = makeShallowWrapper(node);
      expect(wrapper.is("li")).toBe(true);
    });
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeShallowWrapper(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("style", () => {
      it("should pass custom style to li", () => {
        const node = makeNode({ style: { margin: "10px" } });
        const wrapper = makeShallowWrapper(node);
        expect(wrapper.prop("style")).toHaveProperty("margin", "10px");
      });

      validatePropType(propTypes, "style", [
        { value: {}, valid: true, descriptor: "obj" },
        { value: "string", valid: false },
      ]);
    });
  });
});
