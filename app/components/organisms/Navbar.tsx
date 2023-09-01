import Image from "next/image";
import { JWTSession } from "@/lib/types/JWTSession";
import Link from "next/link";
import { getServerSession } from "next-auth";

interface NavbarProps {
  showNotificationIcon?: boolean;
  notificationCount?: number;
}
const Navbar = async ({
  showNotificationIcon,
  notificationCount,
}: NavbarProps) => {
  const session: JWTSession = await getServerSession();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <Link href={`/me`}>
              <Image
                src={session?.user.image || "/person.svg"}
                alt="user image"
                unoptimized
                width={40}
                height={40}
              ></Image>
            </Link>
          </div>
        </label>
      </div>
      <div className="navbar-center">
        <Link
          className="btn btn-ghost normal-case text-xl"
          href={`${process.env.APP_URL}/`}
        >
          BloatStream
        </Link>
      </div>
      <div className="navbar-end">
        <Link
          href={"?modal=true"}
          className=" text-2xl font-bold btn btn-ghost btn-circle"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16.1133"
            height="16.123"
          >
            <g>
              <rect height="16.123" opacity="0" width="16.1133" x="0" y="0" />
              <path
                d="M0 8.05664C0 8.53516 0.400391 8.92578 0.869141 8.92578L7.1875 8.92578L7.1875 15.2441C7.1875 15.7129 7.57812 16.1133 8.05664 16.1133C8.53516 16.1133 8.93555 15.7129 8.93555 15.2441L8.93555 8.92578L15.2441 8.92578C15.7129 8.92578 16.1133 8.53516 16.1133 8.05664C16.1133 7.57812 15.7129 7.17773 15.2441 7.17773L8.93555 7.17773L8.93555 0.869141C8.93555 0.400391 8.53516 0 8.05664 0C7.57812 0 7.1875 0.400391 7.1875 0.869141L7.1875 7.17773L0.869141 7.17773C0.400391 7.17773 0 7.57812 0 8.05664Z"
                fill={`currentColor`}
                fillOpacity="1"
              />
            </g>
          </svg>
        </Link>
        <Link
          className="btn btn-ghost btn-circle"
          href="?notificationModal=true"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {showNotificationIcon && (
              <span className="badge badge-xs badge-info indicator-item">
                {notificationCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
