import { useEffect } from "react";
import { useRouter } from "next/router";

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false });

export default function Page() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push("/sign-in");
    }
  }, [user, loading]);

  return (
    <div className="menu absolute bottom-0 left-0 z-50 w-full flex p-3 flex place-content-around">
      {/* btn-home */}
      <a>
        <svg
          width="43"
          height="29"
          viewBox="0 0 43 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.935 0.386888C21.2756 0.153681 21.7244 0.153681 22.065 0.386888L37.4543 10.9249C38.2653 11.4803 37.8723 12.75 36.8893 12.75H6.11073C5.12773 12.75 4.73467 11.4803 5.54574 10.9249L20.935 0.386888Z"
            fill="#989FAA"
          />
          <rect x="10.75" y="10" width="22" height="19" rx="1" fill="#989FAA" />
        </svg>
      </a>

      <a>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14.6888" cy="8" r="8" fill="#989FAA" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M27.8099 25.8435C28.0931 26.9843 27.1593 28 25.9839 28H1.87714C0.701702 28 -0.232105 26.9843 0.0510742 25.8435C1.59695 19.6158 7.22469 15 13.9305 15C20.6363 15 26.2641 19.6158 27.8099 25.8435Z"
            fill="#989FAA"
          />
        </svg>
      </a>
    </div>
  );
}
