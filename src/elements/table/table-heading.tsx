import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";

export type TableHeadingProps = HelpersProps;

export const TableHeading = forwardRefAs<TableHeadingProps, "th">(
  (props, ref) => <Generic ref={ref} {...props} />,
  { as: "th" },
);
