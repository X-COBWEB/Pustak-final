import React from "react";

const Footer = () => {
  return (
    <div>
      {/*
        Heads up! 👋
      
        Plugins:
          - @tailwindcss/forms
      */}

      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <strong className="block text-center text-xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              Want us to email you with the latest blockbuster news?
            </strong>

            <form className="mt-6">
              <div className="relative max-w-lg">
                <label className="sr-only" htmlFor="email">
                  {" "}
                  Email{" "}
                </label>

                <input
                  className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  id="email"
                  type="email"
                  placeholder="john@doe.com"
                />

                <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32 items-center justify-center">
            {/* Content Section */}
            <div className="mx-auto max-w-sm lg:max-w-none text-center lg:text-left">
              <div className="text-xlg font-semibold">"Pustak"</div>
              <p className="mt-4 text-gray-500 lg:text-lg dark:text-gray-400">
                Donate books, save lives of African kids.
              </p>

              {/* Social Media Links */}
              <div className="mt-6 flex justify-center gap-4 lg:justify-start">
                {/* Social Media Icons */}
                <a
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 5.93a8.581 8.581 0 0 1-2.456.673 4.288 4.288 0 0 0 1.885-2.376 8.578 8.578 0 0 1-2.723 1.039A4.276 4.276 0 0 0 16.078 3a4.273 4.273 0 0 0-4.287 4.276c0 .334.036.659.104.973a12.1 12.1 0 0 1-8.774-4.443A4.267 4.267 0 0 0 3.98 6.87a4.259 4.259 0 0 0 1.324 5.691 4.243 4.243 0 0 1-1.939-.536v.053a4.273 4.273 0 0 0 3.428 4.187 4.26 4.26 0 0 1-1.926.073 4.272 4.272 0 0 0 4.006 2.971A8.588 8.588 0 0 1 2 19.387a12.084 12.084 0 0 0 6.49 1.902c7.799 0 12.062-6.574 12.062-12.286 0-.187-.005-.375-.014-.56A8.572 8.572 0 0 0 22 5.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                <a
                  className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.162c3.214 0 3.595.012 4.868.07 1.194.058 2.279.29 3.144 1.156a4.722 4.722 0 0 1 1.156 3.145c.058 1.273.07 1.654.07 4.869 0 3.214-.012 3.595-.07 4.868a4.722 4.722 0 0 1-1.156 3.145c-.865.866-1.95 1.098-3.144 1.156-1.273.058-1.654.07-4.868.07-3.214 0-3.595-.012-4.868-.07-1.194-.058-2.279-.29-3.144-1.156a4.722 4.722 0 0 1-1.156-3.145c-.058-1.273-.07-1.654-.07-4.868 0-3.214.012-3.595.07-4.868a4.722 4.722 0 0 1 1.156-3.145c.865-.866 1.95-1.098 3.144-1.156 1.273-.058 1.654-.07 4.868-.07zM12 0c-3.332 0-6.668.012-7.986.071-1.504.056-2.798.489-3.878 1.569A5.96 5.96 0 0 0 0 5.222c-.072 1.298-.071 3.432-.071 6.748s0 5.45.071 6.748c.056 1.504.489 2.798 1.569 3.878a5.96 5.96 0 0 0 5.222 1.569c1.298.072 3.432.071 6.748.071s5.45 0 6.748-.071a5.96 5.96 0 0 0 3.878-1.569c1.08-1.08 1.513-2.374 1.569-3.878.072-1.298.071-3.432.071-6.748s0-5.45-.071-6.748c-.056-1.504-.489-2.798-1.569-3.878a5.96 5.96 0 0 0-3.878-1.569c-1.318-.059-4.654-.071-7.986-.071zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.487a4.325 4.325 0 1 1 0-8.65 4.325 4.325 0 0 1 0 8.65zM16.463 4.6a1.273 1.273 0 1 0 0 2.546 1.273 1.273 0 0 0 0-2.546z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>

                {/* Add more social icons similarly */}
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                Pustak © Company 2025. All rights reserved.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
            <p className="text-center text-xs/relaxed text-gray-500 dark:text-gray-400">
              Pustak © Company 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
