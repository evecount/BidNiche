# **App Name**: BidNiche

## Core Features:

- User Authentication & Authorization: Secure user registration and login, with roles to distinguish between buyers and sellers, enabling access to appropriate features, and managing user profiles in Firestore.
- Auction Listing Creation: Authenticated sellers can create detailed auction listings, including title, description, image URLs, starting price, reserve price, and end timestamp. This data is stored in the Firestore 'auctions' collection.
- Public Auction Display: A public page showcasing active auctions. Displays auction details, current highest bid, and bid history, updating in real-time for all viewers by using Firestore real-time listeners.
- Real-Time Bidding Interface: Buyers can place bids via a dynamic interface. Utilizes Firestore real-time listeners to instantly update bid information (current highest bid, bid history) without page reloads, reflecting new bids to all participants.
- Bid Validation & Logic: Backend functions to rigorously validate new bids, ensuring they are strictly higher than the current highest bid and rejecting any submissions after an auction's end timestamp. These functions interact with the 'bids' collection in Firestore.
- Dynamic Auction Countdown: A frontend-rendered, real-time countdown timer that visually indicates the remaining time until an auction's end, based on its designated timestamp, enhancing the sense of urgency for participants.
- Auction Resolution & Winner Determination: Automated server-side process (e.g., a Cloud Function) that triggers upon an auction's end timestamp. This locks the auction, identifies the highest valid bidder (considering reserve prices), and updates the auction's status to 'Closed' and records the winner in Firestore.

## Style Guidelines:

- Primary Color: A vibrant yet grounded deep violet-blue (`#6133E5`), signaling trustworthiness and a contemporary, premium marketplace feel, while providing excellent contrast against lighter backgrounds.
- Background Color: An extremely light, almost off-white with a subtle violet-blue tint (`#F5F4F7`), providing a clean, open canvas that makes product listings stand out and is easy on the eyes in a light mode scheme.
- Accent Color: A clear, strong blue (`#1466CC`), analogous to the primary color but with higher saturation and depth. Used for interactive elements like 'Place Bid' buttons or important notifications to draw immediate attention.
- Body and Headline Font: 'Inter', a modern grotesque sans-serif. Chosen for its neutrality, excellent readability across various screen sizes, and a professional, objective appearance that suits a dynamic commerce platform.
- Use a consistent set of clean, modern line icons to represent key actions and categories. Icons should be clear and intuitive, supporting the app's clean visual style.
- Adopt a clean, grid-based, and responsive layout for auction listings, ensuring clarity and easy navigation across devices. Prioritize content hierarchy to clearly distinguish auction details, bidding controls, and bid history.
- Implement subtle, swift animations for real-time bid updates, status changes, and button interactions, enhancing responsiveness and reinforcing the dynamic, fast-paced nature of the auction process.