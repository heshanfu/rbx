import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DropdownContext, DropdownContextValue } from "./dropdown-context";

export type DropdownTriggerModifierProps = Partial<{
  onClick: React.MouseEventHandler;
}>;

const propTypes = {
  onClick: PropTypes.func,
};

export type DropdownTriggerProps = HelpersProps & DropdownTriggerModifierProps;

const onClickHandler = (
  onClick: DropdownTriggerProps["onClick"] | undefined,
  ctx: DropdownContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.setActive(!ctx.active);
};

export const DropdownTrigger = Object.assign(
  forwardRefAs<DropdownTriggerProps, "div">(
    ({ className, onClick, ...rest }, ref) => (
      <DropdownContext.Consumer>
        {ctx => (
          <Generic
            className={classNames("dropdown-trigger", className)}
            onClick={onClickHandler(onClick, ctx)}
            ref={ref}
            {...rest}
          />
        )}
      </DropdownContext.Consumer>
    ),
    { as: "div" },
  ),
  { propTypes },
);
