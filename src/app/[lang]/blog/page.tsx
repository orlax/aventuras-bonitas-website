import { ABBlog, listBlogs } from "@/api/firebase/blog";
import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import { getDictionary, Locale } from "@/dictionaries";

export default async function Blog({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const blogs = await listBlogs();
  const dictionary = await getDictionary(lang);

  return (
    <main className="flex flex-col bg-ab-black">
      <ContentWrapper
        className="min-h-screen w-full bg-gradient-to-l from-ab-light-blue from-70% to-white
                flex items-start gap-4 py-10 lg:flex-col md:flex-row sm:flex-col xs:flex-col"
      >
        <section className="flex flex-col items-start gap-4 text-ab-black w-full">
          <h3 className="font-semibold text-2xl">{dictionary?.blog.title}</h3>
          <p>{dictionary?.blog.description}</p>
          <div
            className="flex lg:flex-col xl:flex-row sm:flex-col xs:flex-col lg:items-center md:items-center 
                    xl:items-stretch w-full gap-4"
          >
            {blogs.map((item: ABBlog, index: number) => (
              <div
                key={`blog_item_${index}`}
                className="
                                    text-ab-black 
                                    bg-gradient-to-br from-white to-ab-orange max-w-sm 
                                    p-0 overflow-hidden shadow-lg rounded-lg
                                    md:grid-cols-1 
                                    md:flex-[1_1_50%] lg:flex-[1_1_50%]"
              >
                <div className="flex flex-col gap-2 w-full">
                  <iframe
                    width="100%"
                    height="250"
                    src={item.link}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                  <div className="flex flex-col gap-2 p-6">
                    <h4 className="text-sm text-ab-gray">{item.date}</h4>
                    <h4 className="text-xl font-semibold">
                      {item.title[lang]}
                    </h4>
                    <h4 className="text-base">{item.description[lang]}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ContentWrapper>
    </main>
  );
}
