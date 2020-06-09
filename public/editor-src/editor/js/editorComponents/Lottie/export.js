import lottie from "lottie-web";

export default function($node) {
  const node = $node.get(0);

  node.querySelectorAll(".brz-lottie").forEach(node => {
    const animationLink = node.getAttribute("data-animate-name");
    const loop = node.getAttribute("data-anim-loop");
    const speed = node.getAttribute("data-anim-speed");
    const autoplay = node.getAttribute("data-anim-autoplay");
    const direction = node.getAttribute("data-anim-direction");

    lottie.loadAnimation({
      container: node,
      renderer: "svg",
      loop: loop === "on",
      autoplay: autoplay === "on",
      path: animationLink
    });
    lottie.setSpeed(speed);
    lottie.setDirection(direction);
  });
}
