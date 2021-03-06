import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import { Menu } from "src/components/menu/menu";
import { MenuListItem } from "src/components/menu/menu-list-item";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = MenuListItem;
const COMPONENT_NAME = "MenuListItem";
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

  describe("root", () => {
    it("should be li element", () => {
      const node = makeNode({});
      const wrapper = makeShallowWrapper(node);
      expect(wrapper.is("li")).toBe(true);
    });
  });

  testForwardRefAsExoticComponentIntegration(
    makeNode,
    makeGenericHOCShallowWrapperInContextConsumer,
    DEFAULT_ELEMENT,
    BULMA_CLASS_NAME,
  );

  testThemeIntegration(makeNode, makeGenericHOCShallowWrapperInContextConsumer);

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        it(`should ${active ? "" : "not "}be active`, () => {
          const node = makeNode({ active });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-active")).toBe(active);
        });
      });
    });

    describe("menu", () => {
      const validMenu = <Menu />;
      const invalidMenu = { title: "string", items: [1, 2, 3] };

      validatePropType(propTypes, "menu", [
        { value: validMenu, valid: true, descriptor: "node" },
        { value: invalidMenu, valid: false, descriptor: "object" },
      ]);

      [<Menu key={1} className="foo" />, undefined].map(menu => {
        const isMenu = menu !== undefined;
        it(`should ${isMenu ? "" : "not "}have menu`, () => {
          const node = makeNode({ menu });
          const wrapper = makeShallowWrapper(node);
          const children = wrapper.children();
          expect(children).toHaveLength(isMenu ? 2 : 1);
          if (isMenu) {
            expect(children.at(1).hasClass("foo"));
          }
        });
      });
    });
  });
});
