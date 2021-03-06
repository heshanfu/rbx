import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Pagination } from "src/components";
import { PAGINATION_DEFAULTS } from "src/components/pagination/pagination";
import { Section } from "src/layout";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  align: (title: string = "Alignment") =>
    select(
      title,
      iterableToSelectObject(PAGINATION_DEFAULTS.alignments, { undefined: "" }),
      "",
    ),
  link: {
    current: (title: string = "Current") => boolean(title, false),
  },
  rounded: (title: string = "Rounded") => boolean(title, false),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(PAGINATION_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
};

storiesOf("Components/Pagination", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      align: knobs.align(),
      rounded: knobs.rounded(),
      size: knobs.size(),
    });

    const linkProps = {
      current: knobs.link.current("Page 45: current"),
    };

    return (
      <Pagination {...props}>
        <Pagination.Step direction="previous">Previous</Pagination.Step>
        <Pagination.Step direction="next">Next page</Pagination.Step>
        <Pagination.List>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link {...linkProps}>45</Pagination.Link>
          <Pagination.Link>46</Pagination.Link>
          <Pagination.Link>47</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link>86</Pagination.Link>
        </Pagination.List>
      </Pagination>
    );
  });
