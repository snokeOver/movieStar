<h1>MovieStar</h1>

<h2>Proceed To Run On Your Local</h2>

- **_Have A Local Version_**: Clone or download the latest commited version of this frontend for your local machine

- **_Initiate Projects_**: use "npm install" to install all the necessary dependencies

- **_Set Up The Environment Variables_**: Don't forget to set up the environment variables with your own credentials needed to run this projects. Most variable are defined in .env file.

<h2>Live Site URL</h2>
<p>Cick here for live website: <a href="https://movie-star-two.vercel.app/">https://movie-star-two.vercel.app/</a></p>

<h2>Features and Characteristics</h2>

- **_Infinite Scrolling on Home Page_**: Browse a dynamic, endlessly scrolling list of popular movies to reveal additional results.

- **_Search Functionality_**: Quickly search for movies by title, with results displaying via infinite scrolling option for a smooth, uninterrupted experience.

- **_Detailed Movie Pages with ISR_**: View comprehensive movie details—including posters, descriptions, genres, release date, and cast—using SSR with ISR to keep data consistently up-to-date.

- **_Related Movie Recommendations_**: See movie recommendations below the details section, automatically refreshed at set intervals with ISR for current suggestions.

- **_Watchlist Management_**: Easily add movies to your watchlist from detail pages, with quick, optimistic UI updates. Access and manage all saved items on a dedicated Watchlist page.

- **_Dark & Light Mode Preferences_**: Toggle dark and light mode for a personalized viewing experience, with settings stored across sessions and applied globally.

- **_Advanced Data Handling_**: Optimize performance with dynamic caching, and leverage Optimistic UI for instant updates on watchlist actions.

<h2>Scope for Improvement</h2>

- **_API Response Validation with Zod_**: Add Zod to validate TMDB API responses, ensuring required fields are present and providing user-friendly error messages for any issues.

- **_Debounced Search Input_**: Implement debounce logic for the search input to reduce excessive API requests and improve performance.

- **_Authentication Middleware_**: Simulate authentication using Next.js Middleware to secure the watchlist route, with cookies or localStorage for session handling.

- **_Enhanced UI Design_**: Refine the UI for a more visually appealing and engaging user experience.

- **_Testing & Code Quality_**: Integrate unit and integration tests, plus linting, to improve reliability and maintainable code quality.

<h2>Packages Used</h2>

- **_Next.js-14_**: Core framework for building a fast, scalable, and SEO-friendly React-based application.
- **_TypeScript_**: Adds static typing to JavaScript, enhancing code quality, reducing runtime errors, and improving developer experience.
- **_Tailwind CSS_**: Used to show the banner images in a slide view.
- **_React Hook Form_**: Manages form state and validation efficiently, with debounced search functionality for optimized API calls.
- **_Zod_**: Manages form validations
- **_Zustand_**: Lightweight state management library for handling global states, including watchlist and user preferences.
- **_Next Themes_**: Provides easy theming capabilities, including dark mode support.
- **_React-Toastify_**: Used for making visually pleasing toast on user actions.
- **_lucide-React_**: Provides a set of customizable icons to enhance the UI visually.
- **_Embla-Carousel-React_**: Implements a responsive and customizable carousel component for movie posters.
- **_Tailwindcss-Animate_**: Adds animations to Tailwind CSS for smooth transitions and effects.
