import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import InputForm from "@/components/InputForm";

export default function Home() {
  return (
    <div className="h-[100vh] w-[100vw] bg-[#1B1212] lg:p-6 sm:p-4">
      <div className="h-full flex flex-col lg:gap-6 sm:gap-4">
          <Heading/>
          <InputForm/>
          <Footer/>
      </div>
    </div>
  );
}
