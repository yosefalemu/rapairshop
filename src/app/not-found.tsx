import BackButton from "@/components/BackButton";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="px-2 w-full h-screen">
      <div className="mx-auto my-auto h-full py-4 flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Image
          className="m-0 rounded-sm"
          src="/images/not-found.png"
          width={300}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          priority={true}
          title="Page Not Found"
        />
        <BackButton />
      </div>
    </div>
  );
}
