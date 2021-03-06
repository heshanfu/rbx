import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

import { FileCTA } from "./file-cta";
import { FileIcon } from "./file-icon";
import { FileInput } from "./file-input";
import { FileLabel } from "./file-label";
import { FileName } from "./file-name";

export const FILE_DEFAULTS = {
  alignments: tuple("centered", "right"),
  sizes: tuple("small", "medium", "large"),
};

export interface FileVariablesOverrides {}

export interface FileVariablesDefaults {
  alignments: (typeof FILE_DEFAULTS["alignments"])[number];
  sizes: (typeof FILE_DEFAULTS["sizes"])[number];
}

export type FileVariables = Prefer<
  FileVariablesOverrides,
  FileVariablesDefaults
>;

export type FileModifierProps = Partial<{
  align: FileVariables["alignments"];
  boxed: boolean;
  color: Variables["colors"];
  fullwidth: boolean;
  hasName: boolean;
  size: FileVariables["sizes"];
}>;

export type FileProps = HelpersProps & FileModifierProps;

const propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  boxed: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  hasName: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const File = Object.assign(
  forwardRefAs<FileProps, "div">(
    (
      { align, boxed, className, color, fullwidth, hasName, size, ...rest },
      ref,
    ) => (
      <Generic
        className={classNames(
          "file",
          {
            "has-name": hasName,
            [`is-${align}`]: align,
            "is-boxed": boxed,
            [`is-${color}`]: color,
            "is-fullwidth": fullwidth,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    CTA: FileCTA,
    Icon: FileIcon,
    Input: FileInput,
    Label: FileLabel,
    Name: FileName,
    propTypes,
  },
);
