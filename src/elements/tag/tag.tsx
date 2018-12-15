import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { Colors } from "../../modifiers/color";
import { tuple } from "../../utils";
import { TagGroup } from "./tag-group";

export const TAG_SIZES = tuple("normal", "medium", "large");
export type TagSizes = (typeof TAG_SIZES)[number];

export type TagModifierProps = Partial<{
  className: string;
  color: Colors;
  delete: boolean;
  rounded: boolean;
  size: TagSizes;
}>;

export type TagProps = ModifierProps & TagModifierProps;

export const Tag = Object.assign(
  forwardRefAs<TagProps, "span">(
    (props, ref) => {
      const {
        as,
        children,
        color,
        delete: isDelete,
        rounded,
        size,
        ...rest
      } = transformModifiers(props);
      rest.className = classNames("tag", rest.className, {
        [`is-${size}`]: size,
        [`is-${color}`]: color,
        "is-delete": isDelete,
        "is-rounded": rounded,
      });
      return React.createElement(as!, {
        children: !isDelete && children,
        ref,
        ...rest,
      });
    },
    { as: "span" },
  ),
  { Group: TagGroup },
);