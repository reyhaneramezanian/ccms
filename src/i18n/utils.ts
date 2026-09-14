import { GetStaticProps } from "next";
import i18n from "./config";
import { getLocalizationProps } from "./LanguageContext";

export const commonGetStaticPaths = async () => {
  return {
    paths: i18n.locales.map(({ lang }) => ({ params: { lang } })),
    fallback: false,
  };
};
export const commonGetStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};

export const nsGetStaticProps: (
  ...namespaces: Array<string>
) => GetStaticProps =
  (...namespace: Array<string>) =>
  async (ctx) => {
    const localization = getLocalizationProps(ctx, "common", ...namespace);
    return {
      props: {
        localization,
      },
    };
  };
