import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={"/images/site/hero-img.jpg"}
          alt={"Image showing Anuj"}
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Anuj</h1>
      <p>I watch a lot of youtube videos!</p>
    </section>
  );
}

export default Hero;
