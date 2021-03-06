import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type FileCTAProps = HelpersProps;

export const FileCTA = forwardRefAs<FileCTAProps, "div">(
  ({ className, ...rest }, ref) => (
    <Generic
      className={classNames("file-cta", className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);
