import { Ref, forwardRef, useLayoutEffect, useRef } from "react";
import "./App.css";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const scrollElemRef = useRef<HTMLDivElement | null>(null);
  const mainRejouiceTextRef = useRef<HTMLHeadingElement | null>(null);

  const paragraphRef = useRef<HTMLDivElement | null>(null),
    cursorRef = useRef<HTMLDivElement | null>(null),
    cursor2Ref = useRef<HTMLDivElement | null>(null),
    preLoaderRef = useRef<HTMLDivElement | null>(null),
    preLoaderContentRef = useRef<HTMLDivElement | null>(null),
    lineRef = useRef<HTMLDivElement | null>(null),
    mainTextRef = useRef<HTMLDivElement | null>(null);

  // TODO: Gotta turn on soon for smooth scrolling, but for now, it's conflicting with gsap-scroll-trigger animations
  // useLocomotiveScroll(scrollElemRef);
  useLayoutEffect(() => {
    gsap.fromTo(
      paragraphRef.current,
      { y: -20, opacity: 0.8 },
      { scrollTrigger: paragraphRef.current, y: 0, duration: 2, opacity: 1 }
    );
    gsap.fromTo(
      lineRef.current,
      { width: "0%", opacity: 0 },
      {
        scrollTrigger: paragraphRef.current,
        opacity: 1,
        ease: "back",
        width: "60%",
        duration: 2,
      }
    );
    const tl = gsap.timeline();
    tl.from(preLoaderContentRef.current, {
      x: 40,
      opacity: 0,
      duration: 2,
      delay: 1,
      stagger: 0.2,
    });
    tl.to(preLoaderContentRef.current, {
      x: -20,
      delay: 1,
      opacity: 0,
      duration: 2,
      stagger: 0.4,
    });
    tl.to(preLoaderRef.current, { opacity: 0 }).to(preLoaderRef.current, {
      display: "none",
    });
    tl.from(mainRejouiceTextRef.current, {
      y: 50,
      scale: 1.2,
      opacity: 0,
      duration: 0.7,
      stagger: 0.4,
    });
    tl.to(mainTextRef.current, {
      height: "auto",
      translateY: -50,
      opacity: 0.8,
      ease: "power4.inOut",
      duration: 3,
    });
  }, []);

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    movingElement: HTMLDivElement | null
  ) {
    gsap.to(movingElement, { x: e.clientX, y: e.clientY });
  }
  function handleMouseEnter(movingElement: HTMLDivElement | null) {
    gsap.to(movingElement, { scale: 1, opacity: 1 });
  }
  function handleMouseLeave(movingElement: HTMLDivElement | null) {
    gsap.to(movingElement, { scale: 0, opacity: 0 });
  }

  return (
    <main>
      <div
        id="Pre-Loader"
        className={
          "fixed top-0 left-0 bg-black h-full w-full text-white  z-[99] flex justify-center items-center text-[2vw]"
        }
        ref={preLoaderRef}
      >
        <div
          className={"flex gap-2"}
          ref={preLoaderContentRef}
          id="Pre-Loader-Content"
        >
          <h1>Welcome,</h1>
          <h1>To Rejouice</h1>
        </div>
      </div>
      <div ref={scrollElemRef}>
        <div
          onMouseMove={(e) => handleMouseMove(e, cursorRef.current)}
          onMouseEnter={() => handleMouseEnter(cursorRef.current)}
          onMouseLeave={() => handleMouseLeave(cursorRef.current)}
          id={"page1"}
          className={"relative h-screen bg-gray-300 "}
        >
          <MovingCursor isBlack={true} text="Explore" ref={cursor2Ref} />
          <MovingCursor isBlack={false} text="Play Reel" ref={cursorRef} />

          <video
            className={"absolute h-full w-full object-cover"}
            muted
            autoPlay
            loop
            src="/main-video.mp4"
          ></video>
          <div className="content h-full w-full relative z-20 flex flex-col justify-between bg-black/10 text-white">
            <nav className="flex justify-between p-[3vw]">
              <span className={"  cursor-pointer"}>The Venture Agency</span>
              <span className={"cursor-pointer hover:underline"}>Menu</span>
            </nav>
            <div className={"flex justify-center pb-[5vw] text-[30vw]"}>
              <h1
                ref={mainRejouiceTextRef}
                style={{ textShadow: "0 1px 10px gray" }}
                className={" "}
              >
                <span>r</span>
                <span>e</span>
                <span>j</span>
                <span>o</span>
                <span>i</span>
                <span>c</span>
                <span>e</span>
              </h1>
            </div>
            <div
              ref={mainTextRef}
              className="h-0 opacity-0 content overflow-hidden self-end text-[2vw] hover:bg-pink-200/20 bg-black/10 transition rounded-2xl px-[2vw] py-[1vw] mb-[6vw] "
            >
              <p>Lorem aot-enu auaoe ipsum dolor sit elit. Assumenda</p>
              <p className="text-[1.2vw]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
                minima laudantium eaque distinctio mollitia, quia adipisci !
              </p>
            </div>
          </div>
        </div>
        <div id="page2" className={"h-screen pt-[5vw] w-full px-[3vw]"}>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="">
                <p>Full-Services creative agency</p>
                <p className={"-mt-1.5"}>Two engagement models.</p>
              </div>
              <p className={"self-end"}>Paris & San Diego</p>
            </div>
            <div
              ref={lineRef}
              className="line w-0 bg-black h-0.5 mt-4 mb-2"
            ></div>
            <p className={"text-[3.8vw] leading-tight"} ref={paragraphRef}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;We are a digital brand
              accelerator. We design, develop, and scale market-defining brands
              by unlocking their hidden potential. Choose full cash compensation
              or offset up to 50% of our fees for equity in your company. Your
              vision, your decision.
            </p>
          </div>
        </div>
        <div id="page3" className={"min-h-screen w-full relative"}>
          <div
            id="page3-top"
            className={"flex flex-col gap-[2vw] justify-center items-center"}
          >
            <h4 className={"text-xs"}>
              Agenct & Venture{" "}
              <span
                className={
                  "bg-black text-white px-[0.81vw] py-[0.2vw] rounded-full"
                }
              >
                Models
              </span>{" "}
              ↵
            </h4>
            <div className={"text-center text-[4.2vw] leading-[1]"}>
              <h2 className={"underline"}>Explore Our Services </h2>
              <h2 className={"underline"}>& engagement modek</h2>
            </div>
          </div>
          <div
            id="page3-cards"
            className={"h-[70vh] w-full mt-[14vw] flex px-2 justify-between"}
          >
            <div className="box w-[32%] h-full bg-black relative">
              <img
                src={"/img2.avif"}
                className=" w-full h-full object-cover absolute transition-all hover:opacity-0"
              />
              <video
                muted
                autoPlay
                className={"object-cover object-center h-full w-full"}
                loop
                src={"/1.mp4"}
              ></video>
            </div>
            <div className="box w-[32%] h-full bg-black relative">
              <img
                src={"/img1.avif"}
                className=" w-full h-full  object-cover hover:opacity-0 transition-all absolute"
              ></img>
              <video
                muted
                autoPlay
                className={"object-cover object-center h-full w-full"}
                loop
                src={"/2.mp4"}
              ></video>
            </div>
            <div className="box w-[32%] h-full bg-black relative">
              <img
                src={"/img3.avif"}
                className=" w-full h-full object-cover absolute transition-all hover:opacity-0"
              ></img>
              <video
                muted
                autoPlay
                className={"object-cover object-center h-full w-full"}
                loop
                src={"/3.mp4"}
              ></video>
            </div>
          </div>
        </div>
        <div
          id="page4"
          onMouseMove={(e) => handleMouseMove(e, cursor2Ref.current)}
          onMouseEnter={() => handleMouseEnter(cursor2Ref.current)}
          onMouseLeave={() => handleMouseLeave(cursor2Ref.current)}
          className={"h-screen w-full relative"}
        >
          <h1 className={"leading-[1] text-[4.4vw] text-center  mt-[14vw]"}>
            Get Consecutive Updated Deals
            <h2>
              And <span className={"underline"}> Much More</span>
            </h2>
          </h1>
          <div className="flex justify-center items-center absolute h-full w-full ">
            <svg className="h-[62vh]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="49"
                stroke="#fff"
                stroke-width="0.25"
                fill="none"
                className="o:0.3 dasharray:302 dashoffset:604 (.in-view):dashoffset:400 (.in-view):tween:all,2.8s,easeOutSlow "
              ></circle>
              <circle
                cx="50"
                cy="50"
                r="49"
                stroke="#fff"
                stroke-width="0.25"
                fill="none"
                className="dasharray:302 dashoffset:302 (.in-view):dashoffset:100 (.in-view):tween:all,2.8s,easeOutSlow "
              />
            </svg>
          </div>
          <video src={"/RJS.webm"} className={"h-full w-full"} loop muted />
        </div>
        <section className={"w-full mt-[14vw]  "}>
          <Footer />
        </section>
      </div>
    </main>
  );
}

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <p className="text-center">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

interface StartCursorProps {
  // You can define other props here if needed
  isBlack: boolean;
  text: string;
}

const MovingCursor = forwardRef(
  (props: StartCursorProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={`cursor flex justify-center items-center cursor-pointer fixed z-10 h-[8vw] w-[8vw] rounded-full scale-0 shadow-xl ${
          props.isBlack ? "bg-black" : "bg-pink-400"
        } z-80 text-[1.4vw] font-[5vw] ${
          props.isBlack ? "text-white" : "text-black"
        }`}
      >
        <span>{props.text}</span>
      </div>
    );
  }
);
