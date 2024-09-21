/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'i.ytimg.com', 
        'play-lh.googleusercontent.com' // Add the new domain here
      ],
    },
    // Other existing configurations can go here
  };
  
  export default nextConfig;
  