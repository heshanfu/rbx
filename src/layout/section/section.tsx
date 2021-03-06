import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const SECTION_DEFAULTS = {
  sizes: tuple("medium", "large"),
};

export interface SectionVariablesOverrides {}

export interface SectionVariablesDefaults {
  sizes: (typeof SECTION_DEFAULTS["sizes"])[number];
}

export type SectionVariables = Prefer<
  SectionVariablesOverrides,
  SectionVariablesDefaults
>;

export type SectionModifierProps = Partial<{
  size: SectionVariables["sizes"];
}>;

export type SectionProps = HelpersProps & SectionModifierProps;

const propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Section = Object.assign(
  forwardRefAs<SectionProps, "section">(
    ({ className, size, ...rest }, ref) => (
      <Generic
        className={classNames("section", { [`is-${size}`]: size }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "section" },
  ),
  { propTypes },
);
