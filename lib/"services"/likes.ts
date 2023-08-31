const getLikesFromPost = async (postId: number) => {
    const likes = await prisma.like.findMany({
        where: {
        postId: postId
        }
    });
    return likes;
};