// Function that helps interact with our database, since get requests stores caches and it gets weird to deal with them
// Helper function will help us to look into our db.

import { Command } from "lucide-react"

const authURL=process.env.UPSTASH_REDIS_REST_URL
const authToken=process.env.UPSTASH_REDIS_REST_TOKEN

// Will write the commands we are allowed to pass
type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function  fetchRedis(
    command: Command,
    ...args: (string | null)[]
){
    const commandUrl = `${authURL}/${command}/${args.join('/')}`
    const response = await fetch(
        commandUrl,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        cache: "no-store", // Important
      }
    );

    if(!response.ok){
        throw new Error(`Error executing Redis Command: ${response.statusText}`)
    }

    const data = (await response.json())

    return data.result
}