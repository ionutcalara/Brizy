import React from "react";
import EditorComponent from "visual/editorComponents/EditorComponent";
import Toolbar from "visual/component/Toolbar";
import * as toolbarConfig from "./toolbar";
import * as sidebarConfig from "./sidebar";
import defaultValue from "./defaultValue.json";
import classnames from "classnames";
import { css } from "visual/utils/cssStyle";
import { style } from "./styles";
import LottieControl from "./Lottie";
import { ToastNotification } from "visual/component/Notifications";
import { t } from "visual/utils/i18n";

class Lottie extends EditorComponent {
  static get componentId() {
    return "Lottie";
  }

  state = {
    animation: null
  };

  getAnimation = (
    link = "https://assets6.lottiefiles.com/private_files/lf30_1KyL2Q.json"
  ) => {
    fetch(link)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            animation: result
          });
        },
        () => {
          ToastNotification.error(t("Your link is not correct"));
        }
      );
  };

  componentDidMount() {
    const v = this.getValue();
    this.getAnimation(v.animationLink);
  }

  handleValueChange(newValue, meta) {
    super.handleValueChange(newValue, meta);

    if (meta.patch.animationLink) {
      this.getAnimation(meta.patch.animationLink);
    }
  }

  static defaultValue = defaultValue;

  renderForEdit(v, vs, vd) {
    const { speed, loop, autoplay, direction } = v;

    const { animation } = this.state;

    const lottieReactConfig = {
      animationData: animation,
      speed,
      direction,
      loop: loop === "on",
      autoplay: autoplay === "on"
    };

    const className = classnames(
      "brz-lottie",
      css(this.constructor.componentId, this.getId(), style(v, vs, vd))
    );

    return (
      <Toolbar
        {...this.makeToolbarPropsFromConfig2(toolbarConfig, sidebarConfig)}
      >
        <div className={className}>
          <LottieControl {...lottieReactConfig} />
        </div>
      </Toolbar>
    );
  }

  renderForView(v, vs, vd) {
    const { speed, loop, autoplay, direction, animationLink } = v;

    const className = classnames(
      "brz-lottie",
      css(this.constructor.componentId, this.getId(), style(v, vs, vd))
    );

    return (
      <div
        className={className}
        data-animate-name={animationLink}
        data-anim-speed={speed}
        data-anim-loop={loop}
        data-anim-autoplay={autoplay}
        data-anim-direction={direction}
      />
    );
  }
}

export default Lottie;
