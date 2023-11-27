import { useState } from "react";
import TextureChanger from "../components/TextureChanger";
import MenuAction from "../components/MenuAction";
import defaultTexture from "../assets/default-texture.jpg";

function Home() {
  //here we will keep track of the texture to be displayed and the default will be the texture provided in assets folder.
  const [aiTexture, setAiTexture] = useState(defaultTexture);

  return (
    <>
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <h2 className="uppercase text-2xl md:text-4xl">
          Greetings Sneakerhead!
        </h2>
        <h3 className="text-xl md:text-2xl">
          Create your own custom <br className="xl:block hidden" />
          sneaker designs.
        </h3>
      </div>
      {/* passing aiTexture as props to TextureChanger component */}
      <TextureChanger aiTexture={aiTexture} />

      <MenuAction setAiTexture={setAiTexture} />
    </>
  );
}

export default Home;
