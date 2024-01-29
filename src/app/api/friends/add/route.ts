import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { addFriendValidator } from '@/lib/validation/add-friend';
import { getServerSession } from 'next-auth';
import zod from 'zod';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    // const RESTResponse = await fetch(
    //   `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    //     },
    //     cache: 'no-store',
    //   }
    // );

    // const data = (await RESTResponse.json()) as { result: string };
    
    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string;

    if (!idToAdd) {
      return new Response('This person does not exist.', { status: 400 });
    }

    const session = await getServerSession(authOptions);
    
    console.log('Session  :');
    console.log(session);

    if (!session) {
      // To get the deatils for the current authorised user
      return new Response('Unauthorized User', { status: 401 });
    }
    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as a friend', {
        status: 400,
      });
    }

    // If user is already added
    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1;
    if (isAlreadyAdded) {
      return new Response(
        'Already added this user, waiting for the person to accept it',
        {
          status: 400,
        }
      );
    }

    // If user is already your friend
    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:friends`,
      idToAdd
    )) as 0 | 1;
    if (isAlreadyFriends) {
      return new Response("Already added in your Friend's list", {
        status: 400,
      });
    }

    // Sent friend request
    // database.set-add()
    console.log('Sending request after verifying ...');
    db.sadd(`user:${idToAdd}:incoming_friend_request`, session.user.id);

    return new Response('OK');
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return new Response('Invalid request payload', { status: 422 });
    }
    return new Response('Invalid request', { status: 400 });
  }
}
