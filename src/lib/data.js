export const getPosts = async () =>{
    const posts = await fetch("http://jsonplaceholder.typicode.com/posts");
    return posts.json();
}