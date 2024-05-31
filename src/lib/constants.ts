export const getFooterUrls = (dictionary: any, lang: string) => ([
    {
      url: `/${lang}/blog`,
      text: dictionary?.footer?.blog
    },
    // {
    //   url: `/${lang}/jobs`,
    //   text: dictionary?.footer?.jobs
    // },
    {
      url: `/${lang}/subscribe`,
      text: dictionary?.footer?.subscribe
    },
]);