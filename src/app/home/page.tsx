import Image from "next/image";
import atcLogo from "../../../public/logo-atc.svg";
import Stadium from "../../../public/stadium.jpeg";
import Link from "next/link";

const Home = () => {
  return (
    <main
      className="flex justify-center items-center font-play min-h-screen bg-cover bg-center bg-white"
      style={{
        backgroundImage: `url(${Stadium.src})`,
      }}
    >
      <div className="bg-white p-10 rounded-lg min-w-[40%]">
        <section className="flex flex-row justify-center items-center gap-4 h-fit">
          <Image height={100} width={100} src={atcLogo} alt="atc-dream-match" />{" "}
          <h1 className="text-4xl font-play text-black">Dream Match</h1>
        </section>
        <section className="flex justify-center items-center flex-col gap-5 py-10">
          <Link
            href={"selectTeams"}
            style={{ letterSpacing: "2.5px" }}
            className="text-2xl text-center bg-green-600 py-3 w-full font-semibold rounded-lg lg:max-w-[80%] active:bg-green-500 lg:hover:bg-green-500 shadow-lg shadow-gray-400"
          >
            Let's match
          </Link>
          <Link
            href={"/teams"}
            style={{ letterSpacing: "2.5px" }}
            className="text-2xl text-center bg-green-600 py-3 w-full font-semibold rounded-lg lg:max-w-[80%] active:bg-green-500 lg:hover:bg-green-500 shadow-lg shadow-gray-400"
          >
            Teams
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Home;
