Shery.mouseFollower();
Shery.makeMagnet(".magnet-target" /* Element to target.*/, {
  //Parameters are optional.
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

Shery.hoverWithMediaCircle(".mask-target" /* Element to target.*/, {
  // videos: ["/v2.mp4", "/v1.mp4", "/v2.mp4"],
  images:["/2.jpg"]
});

Shery.textAnimate(".text-target" /* Element to target.*/, {
  //Parameters are optional.
  style: 1,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});
