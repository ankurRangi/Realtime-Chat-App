# Project Detailed Steps

## Part 01: Create the Project locally.
1. Use the command `npm create-next-app@latest` to create a next.js app.
2. Run `npm run dev` to test the server of next.js
3. Install Tailwind CSS, if not already installed.

    a. `npm install -D tailwindcss postcss autoprefixer`

    b. `npx tailwindcss init -p`

    c. Copy the file contents to tailwind.config.js and global.css

4. Try the server.


## Part 02: Button Component Setup
1. Create components/ui/Button.tsx file under **src** folder.

2. Button.tsx component can be user with variants using a library `npm install class-variance-authority`
3. Register the new component variant.

4. Update **interface** with extends other React component and variant (with **VariantProps** library) if you need to add values to IntelliSense.

5. For "Conditional Classes", use the function created in `src/lib/util.ts`, use `npm install clsx tailwind-merge1` library.

6. For animated Loader in case of isLoading=True, <Loader2 />, `npm install lucide-react` library.



## Part 03: Database Setup
1. Login to Upstash for Reddis Database.
