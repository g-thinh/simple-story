import { useEffect, useState } from "react";
import StoryblokClient, { StoryData } from "storyblok-js-client";
import { useRouter } from "next/router";

declare global {
  interface Window {
    StoryblokBridge: StoryblokBridge["init"];
  }
}

const Storyblok = new StoryblokClient({
  accessToken: process.env.storyblokAcessToken,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export function useStoryblok<T extends StoryData>(originalStory: T) {
  const [story, setStory] = useState<T>(originalStory);
  const { locale } = useRouter();

  // adds the events for updating the visual editor
  const initEventListeners = () => {
    const { StoryblokBridge } = window;
    if (typeof StoryblokBridge !== "undefined") {
      const storyblokInstance = new StoryblokBridge();

      storyblokInstance.pingEditor(() => {
        if (storyblokInstance.isInEditor()) {
          console.log("Currently viewing from Editor");
        }
      });

      // reload on Next.js page on save or publish event in the Visual Editor
      storyblokInstance.on(["change", "published"], () => location.reload());

      // live update the story on input events
      storyblokInstance.on("input", (event) => {
        // check if the ids of the event and the passed story match
        if (story && event.story.content._uid === story.content._uid) {
          // change the story content through the setStory function
          setStory(event.story);
        }
      });

      storyblokInstance.on("enterEditmode", (event) => {
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: "draft",
          language: locale,
        })
          .then(({ data }) => {
            if (data.story) {
              setStory(data.story);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  };

  //Append the storyblok bridge script
  function addBridge(callback: () => void) {
    const existingScript = document.getElementById("storyblokBridge");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
      script.id = "storyblokBridge";
      document.body.appendChild(script);
      script.onload = () => {
        // once the script is loaded, init the event listeners
        callback();
      };
    } else {
      callback();
    }
  }

  useEffect(() => {
    setStory(originalStory); //update the story on locale change inside getServerSideProps
    // if (preview) {
    //   addBridge(initEventListeners);
    // }

    //Storyblok Editors automatically create a bridge inside the Visual Editor
    if (window.location.search.includes("_storyblok")) {
      // load the bridge only inside of Storyblok
      addBridge(initEventListeners);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalStory]);
  return story;
}

export default Storyblok;
