import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { HeroBody } from "./hero-body";
import { HeroFoot } from "./hero-foot";
import { HeroHead } from "./hero-head";

export const HERO_DEFAULTS = {
  sizes: tuple("medium", "large", "fullheight", "fullheight-with-navbar"),
};

export interface HeroVariablesOverrides {}

export interface HeroVariablesDefaults {
  sizes: (typeof HERO_DEFAULTS["sizes"])[number];
}

export type HeroVariables = Prefer<
  HeroVariablesOverrides,
  HeroVariablesDefaults
>;

export type HeroModifierProps = Partial<{
  color: Variables["colors"];
  gradient: boolean;
  size: HeroVariables["sizes"];
}>;

export type HeroProps = HelpersProps & HeroModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gradient: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Hero = Object.assign(
  forwardRefAs<HeroProps, "section">(
    ({ className, color, gradient, size, ...rest }, ref) => (
      <Generic
        className={classNames(
          "hero",
          {
            "is-bold": gradient,
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "section" },
  ),
  {
    Body: HeroBody,
    Foot: HeroFoot,
    Head: HeroHead,
    propTypes,
  },
);
