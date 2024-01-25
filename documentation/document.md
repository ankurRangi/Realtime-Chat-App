# Project Detailed Steps

## Part 01: Create the Project locally.
1. Use the command `npm create-next-app@latest` to create a next.js app.
2. Run `npm run dev` to test the server of next.js
3. Install Tailwind CSS, if not already installed.

    a. `npm install -D tailwindcss postcss autoprefixer`

    b. `npx tailwindcss init -p`

    c. Copy the file contents to tailwind.config.js and global.css

4. Try the server.


## Part 02: Button Component Created
1. Created components/ui/Button.tsx file under **src** folder.

2. Button.tsx component can be user with variants using a library `npm install class-variance-authority`
3. Registered the new component variant.

4. Updated **interface** with extends other React component and variant (with **VariantProps** library) if you need to add values to IntelliSense.

5. For "Conditional Classes", use the function created in `src/lib/util.ts`, use `npm install clsx tailwind-merge1` library.

6. For animated Loader in case of isLoading=True, <Loader2 />, `npm install lucide-react` library.



## Part 03: Database Setup done
1. Login to Upstash.com for Reddis Database.

2. Created a database and saved the URL and Token variable in .env.local file

3. Connect to the database, use `npm install @upstash/redis` library and create a new { Redis } variable with .env variables.


## Part 04: Authentication
1. Install the library `npm install --save next-auth`

2. Create a file `src/pages/api/auth/[...nextauth].ts` any request that is sent to auth is gonna handled by this file.

3. Create a `auth.ts` library under `src/lib` to export authOptions, Install `npm install @next-auth/upstash-redis-adapter`, it will automically add the data to the database if someone authorise with "login with google" we dont have to worry about it.

4. Now we add [NextAuthOptions](https://next-auth.js.org/configuration/options#session)

    a. **Adapter** - To make the DB interaction happen automatically whenever someone logins. If you want to [create an adapter](https://next-auth.js.org/tutorials/creating-a-database-adapter)

    b. **Session** - Choose how you want to save the user session. The default is `"jwt"`, stored in the session cookie. 

    c. **Pages** - Set auth routes like `/login`

    d. **Providers** - SignIn other options like GoogleProvider etc.

    e. **Callbacks** - Async functions you can use to control what happens when an action is performed. Ex: 
    
        `jwt` - called whenever a jwt is created or updated
        `session` - called whenever a session is checked
        `redirect` - called anytime user is redirected to a callback URL
        `signIn` - callback to control if a user is allowed to sign in.

    
## Part 05: Setup Login Page

1. Created a file `src/app/login/page.tsx` and Added login with Google functionality

2. Added Google Client ID and Secret

3. Notification pop up feature added using  `npm install react-hot-toast`, and created Providers.tsx component `components/ui` file to add add IntelliSense after updating children under root layout.tsx file in `src/app/layout.tsx` with `<Providers />`

4. If you want to create your own secret, open command prompt and install openssl and use `openssl genrsa 2048`


## Part 06: Adding/Inviting friends to Chat App

1. Created a addFriend/page.tsx file under (dashboard) with calls a `<AddFriendButton />`

2. Component added for **AddFriendButton** which takes input from user as a email to connect with other user and start the chat.

3. Use `npm install @tailwindcss/forms` to update the design in margins and add the plugins: [require('@tailwindcss/forms')] in `../tailwind.config.js` file.

4. Now add `npm install react-hook-form @hookform/resolvers zod axios` for input validation with zod and connection with axios.

5. Add a zod validation to the input email to addFriend at `src\lib\validation\add-friend.ts`

6. Create the logic for adding a friend at `api\friends\add\route.ts`

7. Create a helper function to connect with redis `helper\redis.ts`, which will input commands with args and return the output based on the command.


## Layout for Incomming Friend Requests.

1. 





