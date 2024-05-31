import { fireChild, fireDBRef, fireGet } from "@/services/firebase";

export type ABBlog = {
    date: string,
    link: string,
    title: { [key: string]: string },
    description: { [key: string]: string },
}

export const listBlogs = async () => {
    const response = await fireGet(fireChild(fireDBRef, 'blog'));
    const blog: ABBlog[] = response.val();
    return blog;
}