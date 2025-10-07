import bgPhoto from "@/assets/contact-background.jpg";
import { BsWechat } from "react-icons/bs";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const ContactInformation = () => {
  return (
    <div
      className="relative bg-cover bg-center lg:h-[600px] md:h-[450px] h-[620px]"
      style={{ backgroundImage: `url(${bgPhoto.src})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/95 "></div>
      <div className="relative z-10 lg:w-8/12 w-11/12 mx-auto lg:mt-28 md:mt-24 mt-12">
        <div>
          <h3 className="text-center lg:pt-10 md:pt-10 pt-8 font-fontHeading lg:text-4xl md:text-3xl text-2xl font-semibold text-white">
            Contact me
          </h3>
          <p className="text-center mt-2 font-fontHeading text-white">Have a project or job opportunity? Feel free to contact me</p>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-6 text-white lg:mt-16 md:mt-10 mt-6">
          <div className="lg:space-y-5 md:space-y-4 space-y-2">
               <h4 className="lg:text-2xl md:text-xl text-lg font-fontHeading">Get in touch with me</h4>
               <p className="font-fontBody lg:text-base text-sm">I'm currently looking for junior web developer opportunities. If you feel my skills match your team's needs, I'd be happy to connect!</p>
               <div className="flex lg:flex-col md:flex-col justify-evenly gap-4 pt-3">
                    <div className="flex lg:gap-4 md:gap-4 gap-2 items-center">
                    <FaPhoneAlt className="lg:text-4xl md:text-3xl text-2xl text-accent-color"></FaPhoneAlt>
                    <p className="lg:text-base text-sm">+8613120738728</p>
                  </div>
                  <div className="flex lg:gap-4 md:gap-4 gap-2 items-center">
                    <FaWhatsapp className="lg:text-4xl md:text-3xl text-2xl text-accent-color"></FaWhatsapp>
                    <p className="lg:text-base text-sm">+8801954470701</p>
                  </div>
                  <div className="flex lg:gap-4 md:gap-4 gap-2 items-center">
                    <BsWechat className="lg:text-4xl md:text-3xl text-2xl text-accent-color"></BsWechat>
                    <p className="lg:text-base text-sm">ridoybd072287</p>
                  </div>
               </div>
          </div>
          <div>
               <h4 className="lg:text-2xl text-xl lg:mb-5 md:mb-5 mb-3 font-fontHeading">Leave a message for inquiry</h4>
               {/* TO DO -> FORM */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
