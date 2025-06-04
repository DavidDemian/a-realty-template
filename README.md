# A Realty Template

This real estate website template was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Formspree Contact Form Integration

The contact form on this website is integrated with [Formspree](https://formspree.io/), a form backend service that allows you to handle form submissions without setting up your own server.

### How to Update the Formspree Endpoint

To use this template with your own Formspree account:

1. Create a Formspree account at [formspree.io](https://formspree.io/) if you don't have one already
2. Create a new form in your Formspree dashboard
3. Get your form endpoint URL (it will look like `https://formspree.io/f/xayrgjzk`)
4. Open the file `src/config/siteConfig.js`
5. Find the `contact` object and update the `formspreeEndpoint` value with your own Formspree endpoint:

```javascript
// Contact Section Configuration
export const contact = {
  // ... other properties
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your Formspree form ID
  // ... other properties
};
```

That's it! The contact form will now send submissions to your Formspree account.

### Additional Customization

You can customize the form fields and submission data in the `ContactForm.js` component. The form is set up to send the following fields to Formspree:

- Name
- Email
- Phone
- Subject
- Message
- Newsletter subscription status

If you need to add or remove fields, modify the `formData` state and the corresponding JSX in the `ContactForm.js` file.

# Getting Started with Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
