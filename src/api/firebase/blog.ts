export type ABBlog = {
  date: string;
  link: string;
  title: { [key: string]: string };
  description: { [key: string]: string };
};

export const listBlogs = async () => {
  /* 
  Remove Firebase
  const response = await fireGet(fireChild(fireDBRef, 'blog'));
  const blog: ABBlog[] = response.val(); 
  */
  const { blog } = await import("@/api/data.json").then(
    (module) => module.default
  );

  return blog;
};
