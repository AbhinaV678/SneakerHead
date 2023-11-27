import { useState } from "react";
import { AiIcon, SaveIcon, PreloadSVG } from "./Svgs";

let image_base64_String;

//change the canvas into covertible img format
const DownloadImg = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL("");
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function MenuAction({ setAiTexture }) {
  //is the Ai Modal open for input ? Default - false
  const [isAskModal, setAskModal] = useState(false);

  //To show the loading screen after a prompt , Default - false
  const [isThinking, setIsThinking] = useState(false);

  //Has the user provided input ? , Default - Empty(No Input)
  const [input, setInput] = useState("");

  //works with img url
  function convertImageToBase64(input) {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx.drawImage(image, 0, 0);
      image_base64_String = canvas.toDataURL();
      //console.log(image_base64_String);
      setAiTexture(image_base64_String);
    };
    //console.log(input);
    image.src = input;
  }

  //Next Time use a good API!
  //It happens , for now go..
  const onSubmitAction = async () => {
    //if input is null then return
    if (!input) {
      return alert("Please enter a prompt");
    }
    //else- Displaying the preloadIcon
    setIsThinking(true);

    try {
      convertImageToBase64(input);
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setInput("");
      setIsThinking(false);
      setAskModal(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="relative flex p-4 justify-around items-center w-[200px] bg-white h-[80px] rounded-lg drop-shadow-lg bg-opacity-70">
          <button
            className="group w-full h-full"
            onClick={() => setAskModal(true)}
          >
            <AiIcon />
          </button>
          <button className="group w-full h-full" onClick={() => DownloadImg()}>
            <SaveIcon />
          </button>
        </div>
      </div>

      {isAskModal && (
        <div className="fixed overflow-hidden w-full h-full left-0 top-0 bg-yellow-200 bg-opacity-70 flex justify-center items-center">
          {isThinking ? (
            <PreloadSVG />
          ) : (
            <div className="relative w-[600px] h-[300px] bg-white rounded-xl p-4">
              <h3 className="font-bold text-3xl">Paste the image url.</h3>

              <button
                className="px-3 absolute right-2 top-2 text-xl text-white bg-pink-600 border-2 border-pink-600 rounded-md transition-colors hover:bg-white hover:text-pink-600"
                onClick={() => setAskModal(false)}
              >
                X
              </button>

              <textarea
                className="w-full border-2 h-[145px] outline-none"
                placeholder="Eg: https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
                value={input}
                onChange={(e) => setInput(e.target.value.trim())}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.shiftKey === false) {
                    e.preventDefault();
                    input && onSubmitAction();
                  }
                }}
              ></textarea>

              <button
                className="px-8 py-2 mt-2 text-xl font-bold text-white bg-pink-600 border-2 border-pink-600 rounded-lg block mx-auto hover:bg-white hover:text-pink-600"
                onClick={() => onSubmitAction()}
              >
                SUBMIT
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MenuAction;
