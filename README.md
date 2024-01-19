# Orca - Open Source Social Media Web App for Developers

## Overview

Orca is an open-source social media web application tailored for developers. This platform empowers developers to connect, share insights, post text and images, and engage in direct messaging with other users. Orca leverages the MERN (MongoDB, Express.js, React, Node.js) stack, along with cutting-edge technologies such as react-icons, chakra-ui, nodemon, nodemailer, socket.io, bcryptjs, and jsonwebtoken.

## Features

- **User Authentication and Authorization:** Ensure secure user authentication using bcryptjs and implement token-based authorization with jsonwebtoken.
- **Real-time Messaging:** Foster real-time communication with other developers using socket.io.
- **Rich Text and Image Posts:** Share ideas, code snippets, and images with the developer community.
- **Chakra-UI and react-icons:** An aesthetically pleasing and responsive user interface with Chakra-UI components and react-icons for an enhanced user experience.
- **Notifications (Future):** Stay updated with real-time notifications for activities related to your posts and messages.
- **Email Notifications (Future):** Receive email notifications for significant events and updates.
- **Recommendation System (Future):** Discover relevant posts and connect with like-minded developers through a personalized recommendation system.
- **Profile Verification (Future):** Enhance trust within the community by verifying your profile.
- **Community Standards (Future):** A positive, well thought out, inclusive and ethical set of community standards will be estabilished and enforced to the best of our ability.

### Additional Features in Consideration

These are features that we are considering to implement but we are either not quite sure if it makes sense to implement them or we aren't as confident about how to go about the implementation of these features when compared to features listed above.

- **Send Virtual Hugs:** You like a fellow developer and you want to let them know that you appreciate their work in general and make their day? Send them virtual hugs.
- **Sponsor:**  You want to financially support us or some other project/ a developer on our platform? Feel free to sponsor the projects or donate using transactions powered by Stripe
- **Communities:** Forums and groups of like minded devs talking about stuff they care about the most.
- **Group Chats:** Chats involving more than 2 people.
- **Calls:** Allows you to have verbal/face-to-face conversations by harnessing the power of WebRTC.
- **Videos and Livestreams:** Allows you to post videos or livestream to share all the information you want.
- **Resources Repo:** OSS Repo of Free Courses and content for devs to learn from/ to help them prepare for jobs and mental health resources.
- **Job Board and Certifications:** The Job Board Feature would make the process of looking for jobs easier and more seamless and we can also provide free certifications for specific skillsets later down the lines by creating curriculums for open sourced courses.  

## Security Considerations

- **Helmet.js (Future):** Ongoing plans to implement helmet.js to bolster the overall security of the application.

## Scaling

Orca is currently a small-scale application, and active efforts are underway to scale it for a larger user base. Community contributions are highly welcomed to improve and expand the platform.


## Tech Stack

Orca utilizes a modern and robust tech stack to deliver a seamless and feature-rich experience for developers:

- **Frontend:**
  - React.js - A JavaScript library for building user interfaces.
  - Chakra-UI - A simple and modular component library for React for building consistent and responsive user interfaces.
  - react-icons - A library providing popular icons for React applications.
  
- **Backend:**
  - Node.js - A JavaScript runtime for executing server-side code.
  - Express.js - A web application framework for Node.js, facilitating the creation of robust APIs.
  - MongoDB - A NoSQL database for efficient and scalable data storage.
  - Socket.io - A library for enabling real-time, bidirectional and event-based communication.

- **Development Tools:**
  - Nodemon - A tool that automatically restarts the Node.js server during development on file changes.
  - Bcrypt.js - A library for hashing passwords to enhance user authentication security.
  - Jsonwebtoken - A library for generating and verifying JSON web tokens for user authorization.

- **Additional Considerations:**
  - Helmet.js (Future) - A security middleware for Express.js applications to set various HTTP headers and improve security.

This tech stack is carefully chosen to provide a robust foundation for building a scalable, secure, and feature-rich social media platform for developers.

## Contributing

Contributions to Orca are strongly encouraged! If you have ideas for new features, improvements, or bug fixes, please feel free to open issues or pull requests on the GitHub repository.

## Getting Started

To run Orca locally, follow these steps:

1. Clone the repository:

   ```
        git clone https://github.com/your-username/orca.git
   ```

2. Install dependencies:
   
   ```
        cd orca
        npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on the provided `.env.example` template.

4. Start the development server:
   
   ```
        npm run dev
   ```

Visit `http://localhost:3000` in your browser to access Orca locally.

## License
Orca is released under the [MIT License](LICENSE).

Happy coding and connecting with fellow developers! 🚀