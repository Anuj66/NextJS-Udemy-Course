import Link from "next/link";

import Logo from "./logo";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/major-app/public">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/NextJs/Udemy Course/major-app/pages/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
