import { Container, Flex, Grid } from "@chakra-ui/react";
import Link from "components/Link";
import useTranslation from "hooks/useTranslation";
import Drawer from "./Drawer";
import LanguagePicker from "./LanguagePicker";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Nav() {
  const { t } = useTranslation();

  return (
    <Container maxW="100%" px={4} py={2} width="100%">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex width={{ base: "100%", md: "auto" }}>
          <Link
            fontSize={[32, 36]}
            fontWeight="bold"
            mr={{ base: 0, md: "48px" }}
            textAlign={{ base: "center" }}
            href="/"
            sx={{
              ":hover": {
                textDecoration: "none",
                color: "teal.500",
              },
            }}
          >
            Simple Story.
          </Link>
          <Grid
            fontSize="lg"
            fontWeight="bold"
            display={{ base: "none", md: "grid" }}
            mt={{ base: 3, md: 2 }}
            sx={{
              gridAutoFlow: "column",
              gap: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/posts">{t("posts")}</Link>
            <Link href="/about">{t("about")}</Link>
            <Link href="/contact">{t("contactUs")}</Link>
          </Grid>
        </Flex>
        <Grid
          display={{ base: "none", md: "grid" }}
          sx={{
            gridAutoFlow: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          <LanguagePicker />
          <ThemeToggleButton aria-label="toggle dark/light mode" />
        </Grid>
        <Drawer />
      </Flex>
    </Container>
  );
}
