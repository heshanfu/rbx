import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { ButtonGroup } from "./button-group";

export const BUTTON_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
  states: tuple("hovered", "focused", "active", "loading"),
};

export interface ButtonVariablesOverrides {}

export interface ButtonVariablesDefaults {
  sizes: (typeof BUTTON_DEFAULTS["sizes"])[number];
  states: (typeof BUTTON_DEFAULTS["states"])[number];
}

export type ButtonVariables = Prefer<
  ButtonVariablesOverrides,
  ButtonVariablesDefaults
>;

export type ButtonModifierProps = Partial<{
  color: Variables["colors"];
  disabled: boolean;
  fullwidth: boolean;
  inverted: boolean;
  outlined: boolean;
  rounded: boolean;
  selected: boolean;
  size: ButtonVariables["sizes"];
  state: ButtonVariables["states"];
  static: boolean; // tslint:disable-line:no-reserved-keywords
  text: boolean;
}>;

export type ButtonProps = HelpersProps & ButtonModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  fullwidth: PropTypes.bool,
  inverted: PropTypes.bool,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  static: PropTypes.bool,
  text: PropTypes.bool,
};

export const Button = Object.assign(
  forwardRefAs<ButtonProps, "button">(
    (
      {
        className,
        color,
        fullwidth,
        inverted,
        outlined,
        rounded,
        selected,
        size,
        state,
        static: isStatic,
        text,
        ...rest
      },
      ref,
    ) => (
      <Generic
        className={classNames(
          "button",
          {
            [`is-${color}`]: color,
            "is-fullwidth": fullwidth,
            "is-inverted": inverted,
            "is-outlined": outlined,
            "is-rounded": rounded,
            "is-selected": selected,
            [`is-${size}`]: size,
            [`is-${state}`]: state,
            "is-static": isStatic,
            "is-text": text,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "button" },
  ),
  {
    Group: ButtonGroup,
    propTypes,
  },
);
