import * as Enzyme from "enzyme";
import * as React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
} from "src/base/theme";
import {
  initialValue as navbarInitialValue,
  NavbarContextValue,
} from "src/components/navbar/navbar-context";
import { NavbarLink } from "src/components/navbar/navbar-link";

import {
  hasProperties,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validatePropType,
} from "src/__tests__/testing";

const COMPONENT = NavbarLink;
const COMPONENT_NAME = "NavbarLink";
const DEFAULT_ELEMENT = "span";
const BULMA_CLASS_NAME = "navbar-link";

const makeNode = makeNodeFactory(COMPONENT);

const makeShallowWrapperInNavbarContextConsumer = (
  node: JSX.Element,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerWrapper = Enzyme.shallow(node);
  const NavbarContextConsumerChildren = (navbarContextConsumerWrapper.props() as {
    children: React.FC<NavbarContextValue>;
  }).children;

  return Enzyme.shallow(
    <NavbarContextConsumerChildren {...navbarContextValue} />,
  );
};

const makeGenericHOCShallowWrapperInContextConsumer = (
  node: JSX.Element,
  themeContextValue: ThemeContextValue = themeInitialValue,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
) => {
  const navbarContextConsumerChildrenWrapper = makeShallowWrapperInNavbarContextConsumer(
    node,
    navbarContextValue,
  );
  const themeContextConsumerWrapper = navbarContextConsumerChildrenWrapper.dive();
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

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("arrowless", () => {
      validateBoolPropType(propTypes, "arrowless");

      [false, true].map(arrowless => {
        it(`should ${arrowless ? "" : "not "}be arrowless`, () => {
          const node = makeNode({ arrowless });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-arrowless")).toBe(arrowless);
        });
      });
    });

    describe("onClick", () => {
      validatePropType(propTypes, "onClick", [
        { value: () => undefined, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      [false, true].map(hasOnClick => {
        it(`should update context ${
          hasOnClick ? "and call provided onClick" : ""
        }`, () => {
          const onClick = jest.fn();
          const setActive = jest.fn();
          const node = makeNode({ onClick: hasOnClick ? onClick : undefined });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(
            node,
            themeInitialValue,
            {
              active: false,
              setActive,
            },
          );
          wrapper.simulate("click");
          expect(onClick.mock.calls).toHaveLength(hasOnClick ? 1 : 0);
          expect(setActive.mock.calls).toHaveLength(1);
          expect(setActive.mock.calls[0]).toEqual([true]);
        });
      });
    });
  });
});
