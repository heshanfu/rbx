import { Field, FIELD_DEFAULTS } from "src/elements/form/field";
import { FieldBody } from "src/elements/form/field-body";
import { FieldLabel } from "src/elements/form/field-label";

import {
  hasProperties,
  makeGenericHOCShallowWrapperInContextConsumer,
  makeNodeFactory,
  testForwardRefAsExoticComponentIntegration,
  testThemeIntegration,
  validateBoolPropType,
  validateStringOrNumberPropType,
} from "src/__tests__/testing";

const COMPONENT = Field;
const COMPONENT_NAME = "Field";
const DEFAULT_ELEMENT = "div";
const BULMA_CLASS_NAME = "field";

const makeNode = makeNodeFactory(COMPONENT);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Body: FieldBody,
    Label: FieldLabel,
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

    describe("align", () => {
      validateStringOrNumberPropType(propTypes, "align");

      FIELD_DEFAULTS.alignments.map(align =>
        FIELD_DEFAULTS.kinds.map(kind => {
          it(`should be aligned ${kind}-${align}`, () => {
            const node = makeNode({ align, kind });
            const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
            expect(
              wrapper.hasClass(
                kind === "addons"
                  ? `has-addons-${align}`
                  : `is-grouped-${align}`,
              ),
            ).toBe(true);
          });
        }),
      );
    });

    describe("expanded", () => {
      validateBoolPropType(propTypes, "expanded");

      [false, true].map(expanded => {
        it(`should ${expanded ? "" : "not "}be expanded`, () => {
          const node = makeNode({ expanded });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-expanded")).toBe(expanded);
        });
      });
    });

    describe("horizontal", () => {
      validateBoolPropType(propTypes, "horizontal");

      [false, true].map(horizontal => {
        it(`should ${horizontal ? "" : "not "}be horizontal`, () => {
          const node = makeNode({ horizontal });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-horizontal")).toBe(horizontal);
        });
      });
    });

    describe("kind", () => {
      validateStringOrNumberPropType(propTypes, "kind");

      FIELD_DEFAULTS.kinds.map(kind => {
        it(`should be kind ${kind}`, () => {
          const node = makeNode({ kind });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(
            wrapper.hasClass(kind === "group" ? "is-grouped" : "has-addons"),
          ).toBe(true);
        });
      });
    });

    describe("multiline", () => {
      validateBoolPropType(propTypes, "multiline");

      [false, true].map(multiline =>
        FIELD_DEFAULTS.kinds.map(kind => {
          it(`should ${
            multiline && kind === "group" ? "" : "not "
          }be multiline when kind is ${kind} and multiline is ${multiline}`, () => {
            const node = makeNode({ multiline, kind });
            const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
            expect(wrapper.hasClass("is-grouped-multiline")).toBe(
              multiline && kind === "group",
            );
          });
        }),
      );
    });

    describe("narrow", () => {
      validateBoolPropType(propTypes, "narrow");

      [false, true].map(narrow => {
        it(`should ${narrow ? "" : "not "}be narrow`, () => {
          const node = makeNode({ narrow });
          const wrapper = makeGenericHOCShallowWrapperInContextConsumer(node);
          expect(wrapper.hasClass("is-narrow")).toBe(narrow);
        });
      });
    });
  });
});
