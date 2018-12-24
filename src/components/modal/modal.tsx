import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import { forwardRefAs } from "../../base";
import { Omit } from "../../types";
import { canUseDOM } from "../../utils";
import { ModalBackground } from "./modal-background";
import { ModalCard } from "./modal-card";
import { ModalClose } from "./modal-close";
import { ModalContent } from "./modal-content";
import { ModalPortal, ModalPortalProps } from "./modal-portal";

export type ModalModifierProps = Partial<{
  active: boolean;
}>;

export type ModalProps = Omit<ModalContainerProps, "as" | "innerRef">;

const propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  closeOnBlur: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  containerClassName: PropTypes.string,
  onClose: PropTypes.func,
};

export type ModalContainerProps = ModalPortalProps &
  ModalModifierProps & { containerClassName?: string };

export class ModalContainer extends React.PureComponent<ModalContainerProps> {
  private el: HTMLDivElement | undefined;

  constructor(props: ModalContainerProps) {
    super(props);
    if (canUseDOM()) {
      this.el = document.createElement("div");
      if (props.containerClassName) {
        this.el.className = props.containerClassName;
      }
    }
  }

  public componentDidMount() {
    if (canUseDOM()) {
      document.body.appendChild(this.el!);
    }
  }

  public componentWillUnmount() {
    if (canUseDOM()) {
      document.body.removeChild(this.el!);
    }
  }

  public render() {
    const { active, containerClassName, ...rest } = this.props;
    return this.el && active
      ? ReactDOM.createPortal(<ModalPortal {...rest} />, this.el)
      : null;
  }
}

export const Modal = Object.assign(
  forwardRefAs<ModalProps, "div">(
    (props, ref) => {
      const { as, ...rest } = props;
      return <ModalContainer as={as!} innerRef={ref} {...rest} />;
    },
    { as: "div" },
  ),
  {
    Background: ModalBackground,
    Card: ModalCard,
    Close: ModalClose,
    Content: ModalContent,
    propTypes,
  },
);