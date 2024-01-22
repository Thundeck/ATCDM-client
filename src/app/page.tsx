import Image from "next/image";
import atcLogo from "../../public/logo-atc.svg";
import Stadium from "../../public/stadium.jpeg";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen relative bg-cover bg-center "
      style={{
        backgroundImage: `url(${Stadium.src})`,
      }}
    >
      <div className=" w-full bg-gray-900/60 bg-blur flex justify-center items-center flex-col gap-10 min-h-screen">
        <h2 className="text-2xl font-bold">welcome to</h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 h-fit">
          <Image height={100} width={200} src={atcLogo} alt="atc-dream-match" />{" "}
          <h1 className="text-7xl font-play ">Dream Match</h1>
        </div>
        <Link
          href={"/home"}
          className="text-2xl font-semibold bg-green-600 py-2 px-4 rounded-lg hover:bg-green-500 duration-300 "
        >
          go to the match
        </Link>
      </div>
    </main>
  );
}
