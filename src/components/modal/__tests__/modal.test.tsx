import * as Enzyme from "enzyme";
import * as React from "react";

import { Modal } from "src/components/modal/modal";
import { ModalBackground } from "src/components/modal/modal-background";
import { ModalCard } from "src/components/modal/modal-card";
import { ModalClose } from "src/components/modal/modal-close";
import { ModalContainer } from "src/components/modal/modal-container";
import { ModalContent } from "src/components/modal/modal-content";
import { ModalContext } from "src/components/modal/modal-context";
import { ModalPortal } from "src/components/modal/modal-portal";

import {
  hasProperties,
  makeNodeFactory,
  makeTestPropForwarding,
  validateBoolPropType,
  validatePropType,
  validateStringPropType,
} from "src/__tests__/testing";

const COMPONENT = Modal;
const COMPONENT_NAME = "Modal";
const DEFAULT_ELEMENT = "div";
// const BULMA_CLASS_NAME = "modal";

const makeNode = makeNodeFactory(Modal);

const testPropForwarding = makeTestPropForwarding(makeNode);

describe(`${COMPONENT_NAME} component`, () => {
  hasProperties(COMPONENT, {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Container: ModalContainer,
    Content: ModalContent,
    Context: ModalContext,
    Portal: ModalPortal,
    defaultProps: { as: DEFAULT_ELEMENT },
  });

  test("it renders a ModalContainer", () => {
    const node = makeNode({});
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(ModalContainer)).toBe(true);
  });

  describe("props", () => {
    const { propTypes } = COMPONENT;

    describe("active", () => {
      validateBoolPropType(propTypes, "active");

      [false, true].map(active => {
        testPropForwarding("active", active);
      });
    });

    describe("as", () => {
      testPropForwarding("as", "div");
    });

    describe("className", () => {
      testPropForwarding("className", "foo");
    });

    describe("closeOnBlur", () => {
      validateBoolPropType(propTypes, "closeOnBlur");

      [false, true].map(closeOnBlur => {
        testPropForwarding("closeOnBlur", closeOnBlur);
      });
    });

    describe("closeOnEsc", () => {
      validateBoolPropType(propTypes, "closeOnEsc");

      [false, true].map(closeOnEsc => {
        testPropForwarding("closeOnEsc", closeOnEsc);
      });
    });

    describe("containerClassName", () => {
      validateStringPropType(propTypes, "containerClassName");

      testPropForwarding("containerClassName", "foo");
    });

    describe("onClose", () => {
      validatePropType(propTypes, "onClose", [
        { value: () => undefined, valid: true, descriptor: "func" },
        { value: "string", valid: false },
      ]);

      testPropForwarding("onClose", () => undefined);
    });

    describe("ref", () => {
      testPropForwarding("ref", React.createRef(), "innerRef");
    });
  });
});
