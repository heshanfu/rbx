import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";
import { Variables } from "./variables";

export type LimitedResponsiveBreakpointProps = Partial<{
  display: {
    value: Variables["displays"];
  };
  hide: {
    value: boolean;
  };
  textAlignment: {
    value: Variables["textAlignments"];
  };
  textSize: {
    value: Variables["textSizes"];
  };
}>;

export type ResponsiveBreakpointProps = Partial<{
  display: {
    only?: boolean;
    value: Variables["displays"];
  };
  hide: {
    only?: boolean;
    value: boolean;
  };
  textAlignment: {
    only?: boolean;
    value: Variables["textAlignments"];
  };
  textSize: {
    only?: boolean;
    value: Variables["textSizes"];
  };
}>;

export type ResponsiveHelpersProps = Partial<{
  responsive: Partial<
    {
      [B in Variables["breakpointsLimited"]]: LimitedResponsiveBreakpointProps
    } &
      {
        [B in Exclude<
          Variables["breakpoints"],
          Variables["breakpointsLimited"]
        >]: ResponsiveBreakpointProps
      }
  >;
}>;

export const makeResponsiveBreakpointPropTypes = makePropTypesFactory(vars => ({
  display: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(vars.displays).isRequired,
  }),
  hide: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.bool.isRequired,
  }),
  textAlignment: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(vars.textAlignments).isRequired,
  }),
  textSize: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(vars.textSizes).isRequired,
  }),
}));

export const makeResponsiveBreakpointLimitedPropTypes = makePropTypesFactory(
  vars => ({
    display: PropTypes.shape({
      value: PropTypes.oneOf(vars.displays).isRequired,
    }),
    hide: PropTypes.shape({
      value: PropTypes.bool.isRequired,
    }),
    textAlignment: PropTypes.shape({
      value: PropTypes.oneOf(vars.textAlignments).isRequired,
    }),
    textSize: PropTypes.shape({
      value: PropTypes.oneOf(vars.textSizes).isRequired,
    }),
  }),
);

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  responsive: PropTypes.shape(
    vars.breakpoints
      .map(breakpoint => ({
        [breakpoint]: PropTypes.shape(
          vars.breakpointsLimited.indexOf(breakpoint) === -1
            ? makeResponsiveBreakpointPropTypes(vars)
            : makeResponsiveBreakpointLimitedPropTypes(vars),
        ),
      }))
      .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ),
}));

export const transform: TransformFunction<ResponsiveHelpersProps> = props => {
  const { responsive, ...rest } = props;
  // Can remove "no-any" and "no-unsafe-any" with TypeScript 3.3
  // https://github.com/Microsoft/TypeScript/pull/29121
  // tslint:disable:no-any
  // tslint:disable:no-unsafe-any
  (rest as any).className = classNames(
    responsive !== undefined
      ? Object.keys(responsive)
          .filter(breakpoint => responsive[breakpoint] !== undefined)
          .map(breakpoint => {
            const names = {};
            const { display, hide, textAlignment, textSize } = responsive[
              breakpoint
            ] as ResponsiveBreakpointProps | LimitedResponsiveBreakpointProps;
            if (display !== undefined) {
              const value = display.value;
              const only = "only" in display ? display.only === true : false;
              names[`is-${value}-${breakpoint}${only ? "-only" : ""}`] = value;
            }
            if (hide !== undefined) {
              const value = hide.value;
              const only = "only" in hide ? hide.only === true : false;
              names[`is-hidden-${breakpoint}${only ? "-only" : ""}`] = value;
            }
            if (textAlignment !== undefined) {
              const value = textAlignment.value;
              const only =
                "only" in textAlignment ? textAlignment.only === true : false;
              names[
                `has-text-${value}-${breakpoint}${only ? "-only" : ""}`
              ] = value;
            }
            if (textSize !== undefined) {
              const value = textSize.value;
              const only = "only" in textSize ? textSize.only === true : false;
              names[
                `is-size-${value}-${breakpoint}${only ? "-only" : ""}`
              ] = value;
            }

            return names;
          })
          .reduce((acc, cv) => ({ ...acc, ...cv }), {})
      : undefined,
    (rest as any).className,
  );

  return rest;
};

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
