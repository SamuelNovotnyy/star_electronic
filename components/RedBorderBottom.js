/** @format */

export default function RedBorderBottom({ className = '' }) {
  return (
    <div className={`z-100 fixed hidden lg:block top-0 left-0 ${className}`}>
      <div className="border-b-2 nav h-[68px] w-[20vw]"></div>
    </div>
  );
}
