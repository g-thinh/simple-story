import Storyblok from "services/storyblok";
import {
  StoryParams,
  StoriesParams,
  StoryblokResult,
} from "storyblok-js-client";
import {
  StoryResult,
  StoryPost,
  StoryAuthor,
  StoryblokLinks,
  StoryHome,
  LinkParams,
  Tag,
} from "types/api";
import Router from "next/router";

export async function getHomepage(
  params?: StoryParams
): Promise<StoryResult<StoryHome>> {
  const response = await Storyblok.getStory("home", params);
  return response.data.story;
}

export async function getStory(
  slug: string,
  params?: StoryParams
): Promise<StoryResult<StoryPost>> {
  const response = await Storyblok.getStory(slug, params);
  return response.data.story;
}

export async function getTag(tagId: string): Promise<StoryResult<Tag>> {
  const { locale } = Router;
  const response = await Storyblok.getStory(tagId, {
    find_by: "uuid",
    language: locale,
  });
  return response.data.story;
}

//Stories are linked to the authors folder and only return a UUID
export async function getAuthor(
  slug: string
): Promise<StoryResult<StoryAuthor>> {
  const { locale } = Router;
  const response = await Storyblok.getStory(slug, {
    find_by: "uuid",
    language: locale,
  });
  return response.data.story;
}

export async function getStories(
  params?: StoriesParams
): Promise<StoryResult<StoryPost>[]> {
  const response = await Storyblok.getStories(params);
  return response.data.stories;
}

interface GetPathsResult extends StoryblokResult {
  data: StoryblokLinks;
}

type LinkPath = {
  params: {
    slug: string[];
  };
};

//next thing to do is to prepare all possible slugs with locales
export async function getStoriesPaths(params?: LinkParams, locales?: string[]) {
  const response: GetPathsResult = await Storyblok.get("cdn/links", params);
  const { links } = response.data;
  let paths: LinkPath[] = [];

  // get array for slug because of catch all
  for (const locale of locales) {
    Object.keys(links).forEach((link_id) => {
      if (!links[link_id].is_startpage && !links[link_id].is_folder) {
        const slug = links[link_id].real_path;
        const result = {
          params: {
            slug: [locale],
            locale,
          },
        };

        paths.push(result);
      }
    });
  }

  return paths;
}
