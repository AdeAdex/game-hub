// app/api/posts/comments/route.js


import { NextApiResponse, NextApiRequest, NextResponse } from 'next';
import { connectToDb } from '../../../utils/database';
import Post from '../../../models/post';

export const POST = async (req, res ) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const { content, userId, postId} =  await req.json();

    // Validate required fields
    if (!content || !userId) {
      return NextResponse.json({ message: 'Content and userId are required' }, { status: 400 });
    }

    await connectToDb();

    // Find the post by postId (assuming postId is provided in the request body or query params)
    
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Create a new comment object
    const newComment = {
      content,
      userId,
    };

    // Add the new comment to the post's comments array
    post.comments.push(newComment);
    await post.save();

    // Populate the userId field with user data (profilePicture, firstName, lastName)
    await post.populate('comments.userId', 'profilePicture firstName lastName').execPopulate();

    // Return the populated post data with 201 Created status using NextResponse.json
    const populatedPost = { post: post.comments };
    return NextResponse.json(populatedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error.message);
    return NextResponse.json({ message: 'Failed to create comment' }, { status: 500 });
  }
};
