import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type PanelTabModifierProps = Partial<{
  active: boolean;
}>;

export type PanelTabProps = HelpersProps & PanelTabModifierProps;

const propTypes = {
  active: PropTypes.bool,
};

export const PanelTab = Object.assign(
  forwardRefAs<PanelTabProps, "a">(
    ({ active, className, ...rest }, ref) => (
      <Generic
        className={classNames({ "is-active": active }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "a" },
  ),
  { propTypes },
);
