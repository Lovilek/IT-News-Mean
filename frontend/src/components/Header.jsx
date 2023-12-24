import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Marlen & Artem</span>
        <span className="headerTitleLg">Project</span>
      </div>
      <img
        className="headerImg"
        src="https://c.pxhere.com/images/7e/83/9874c16b50d549e89d9fc4bbb60f-1448913.jpg!d"
        alt=""
      />
    </div>
  );
}