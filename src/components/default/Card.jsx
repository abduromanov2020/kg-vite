import { Link } from "react-router-dom";

export const Card = ({
  className,
  children,
  title,
  icon,
  src,
  href,
  imgwidth,
  imgheight,
  titleStyle,
  hasImage,
  imgStyle,
  onClick,
}) => {
  return (
    <>
      {href ? (
        <Link to={`${href}`}>
          <div
            className={`${className} flex auto p-4 bg-white border flex-col gap-2`}
            onClick={onClick}
          >
            {hasImage && (
              <img
                className={`object-cover ${imgStyle}`}
                src={src}
                alt="Picture of the author"
                width={imgwidth}
                height={imgheight}
              />
            )}
            {icon}
            <h1 className={titleStyle}>{title}</h1>
            <section className="flex">{children}</section>
          </div>
        </Link>
      ) : (
        <div
          className={`${className} flex bg-white shadow-md  auto p-4 flex-col cursor-pointer`}
          onClick={onClick}
        >
          {hasImage && (
            <img
              className={`w-full object-cover ${imgStyle}`}
              src={src}
              alt={title}
              width={imgwidth}
              height={imgheight}
            />
          )}
          {icon}
          <h1 className={titleStyle}>{title}</h1>
          {children}
        </div>
      )}
    </>
  );
};
