import { number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Progress } from "src/elements";
import { PROGRESS_DEFAULTS } from "src/elements/progress/progress";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  max: (title: string = "Max") =>
    number(title, 100, { range: true, min: 1, max: 100, step: 1 }),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(PROGRESS_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
  value: (title: string = "Value") =>
    number(title, 15, { range: true, min: 0, max: 100, step: 1 }),
};

storiesOf("Elements/Progress", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { max, value, ...rest } = filterUndefined({
      color: colorKnob(),
      max: knobs.max(),
      size: knobs.size(),
      value: knobs.value(),
    });

    return <Progress max={max as number} value={value as number} {...rest} />;
  });
