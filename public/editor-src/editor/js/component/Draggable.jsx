import React from "react";
import classNames from "classnames";
import _ from "underscore";
import T from "prop-types";
import $ from "jquery";

const getClientOffset = event => ({
  x: event.clientX,
  y: event.clientY
});

class Draggable extends React.Component {
  static propTypes = {
    className: T.string,
    style: T.object,
    draggingCursor: T.string,
    renderPopover: T.func,
    onDragStart: T.func,
    onDrag: T.func,
    onDragEnd: T.func,
    exceptions: T.arrayOf(T.string)
  };

  static defaultProps = {
    className: "",
    style: {},
    draggingCursor: null,
    renderPopover: null,
    onDragStart: _.noop,
    onDrag: _.noop,
    onDragEnd: _.noop
  };

  state = {
    isDragging: false
  };

  isMouseDown = null;

  startPosition = null;

  currentPosition = null;

  lastDelta = null;

  componentWillUnmount() {
    this.clearDragData();
  }

  handleClick = e => {
    e.stopPropagation();
  };

  handleMouseDown = e => {
    const exceptions = this.props.exceptions ?? [];
    if (
      exceptions.length &&
      $(e.target).closest(exceptions.join(", ")).length
    ) {
      return;
    }

    e.stopPropagation();
    // left click only
    if (e.button !== 0) {
      return;
    }

    this.initMouseEvents();
  };

  startDrag = client => {
    const { draggingCursor, onDragStart } = this.props;

    const overlayNode = document.querySelector(".brz-root__container-after");
    overlayNode.style.pointerEvents = "all";
    if (draggingCursor) {
      overlayNode.style.cursor = draggingCursor;
    }

    global.BRZ_IS_DRAGGING = true;

    this.isMouseDown = true;
    this.currentPosition = this.startPosition = client;

    window.parent.document.body.classList.add("brz-pointer-events-none");
    onDragStart();
    this.initMouseEvents();

    this.setState({ isDragging: true }, () => {
      requestAnimationFrame(this.update);
    });
  };

  handleMouseMove = e => {
    if (!this.isMouseDown) {
      this.startDrag(getClientOffset(e));
    } else {
      this.currentPosition = getClientOffset(e);
    }
  };

  handleMouseUp = () => {
    this.clearDragData();

    if (!this.isMouseDown) {
      const { onDragEnd } = this.props;
      onDragEnd();

      this.setState({
        isDragging: false
      });
    }
  };

  clearDragData = () => {
    this.cleanMouseEvents();

    if (!this.isMouseDown) {
      return;
    }

    const { draggingCursor } = this.props;

    const overlayNode = document.querySelector(".brz-root__container-after");
    overlayNode.style.pointerEvents = "none";
    if (draggingCursor) {
      overlayNode.style.cursor = "auto";
    }

    global.BRZ_IS_DRAGGING = false;

    this.isMouseDown = false;
    this.startPosition = null;
    this.lastDelta = null;

    window.parent.document.body.classList.remove("brz-pointer-events-none");
  };

  onMouseUp = () => {
    if (!this.isMouseDown) {
      this.clearDragData();
    }
  };

  update = () => {
    if (this.isMouseDown) {
      requestAnimationFrame(this.update);

      const deltaX = this.currentPosition.x - this.startPosition.x;
      const deltaY = this.currentPosition.y - this.startPosition.y;
      const { x: lastDeltaX, y: lastDeltaY } = this.lastDelta || {};

      if (deltaX !== lastDeltaX || deltaY !== lastDeltaY) {
        this.lastDelta = {
          x: deltaX,
          y: deltaY
        };
        this.props.onDrag({
          deltaX,
          deltaY
        });
      }
    }
  };

  initMouseEvents = () => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  cleanMouseEvents = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  render() {
    const { className: _className, style = null, renderPopover } = this.props;
    const { isDragging } = this.state;
    const className = classNames(
      "brz-ed-draggable",
      "brz-ed-dd-cancel",
      _className
    );

    return (
      <div
        className={className}
        style={style}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.onMouseUp}
        onClick={this.handleClick}
      >
        {this.props.children}
        {isDragging && renderPopover && renderPopover()}
      </div>
    );
  }
}

export default Draggable;
