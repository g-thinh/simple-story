import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { StoryPost, StoryResult } from "types/api";
import Author from "./Author";
import Image from "./Image";
import Link from "./Link";
import Tags from "./Tags";

type CardPostProps = {
  story: StoryResult<StoryPost>;
};

export function CardLatestPost({ story }: CardPostProps) {
  return (
    <Box
      marginTop={{ base: "1", sm: "5" }}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center"
        mb={4}
      >
        <Box
          width={{ base: "85%", sm: "90%" }}
          zIndex="2"
          marginLeft={{ base: "0", sm: "5%" }}
          marginTop="5%"
        >
          <Link
            href={`/${story.full_slug}`}
            tabIndex={-1}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              src={story.content.image.filename}
              alt={story.content.image.alt}
              allowZoom
            />
          </Link>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              "radial(teal.600 1px, transparent 1px)",
              "radial(teal.300 1px, transparent 1px)"
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <Tags tags={story.content.tags} />
        <Heading marginTop="1">
          <Link
            href={`/${story.full_slug}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {story.content.title}
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue("gray.700", "gray.200")}
          fontSize="lg"
        >
          {story.content.intro}
        </Text>
        <Author
          mt={0}
          authorId={story.content.author}
          date={story.first_published_at}
        />
      </Box>
    </Box>
  );
}

export function CardPost({ story }: CardPostProps) {
  return (
    <Flex flexDir="column" height="100%">
      <Box w="100%">
        <Box borderRadius="lg">
          <Link
            href={`/${story.full_slug}`}
            tabIndex={-1}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Image
              src={story.content.image.filename}
              alt={story.content.image.alt}
              allowZoom
            />
          </Link>
        </Box>
      </Box>

      <Flex flexDirection="column" height="100%">
        <Heading fontSize="xl" marginTop="2">
          <Link
            href={`/${story.full_slug}`}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {story.content.title}
          </Link>
        </Heading>
        <Flex flexGrow={1} flexDir="column">
          <Text as="p" fontSize="md" marginTop="2">
            {story.content.intro}
          </Text>
          <Tags tags={story.content.tags} marginTop="3" />
        </Flex>
      </Flex>
    </Flex>
  );
}
