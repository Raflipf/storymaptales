# Troubleshooting Service Worker Registration for Your PWA

Follow these steps to ensure your service worker is properly registered when serving the `dist` folder:

1. **Start the server serving the `dist` folder:**

   ```bash
   npx serve -s dist
   ```

   By default, this serves on `http://localhost:5000`.

2. **Open the application in your browser:**

   Navigate to `http://localhost:5000` (or the port shown in the terminal).

3. **Open Developer Tools:**

   - Press `F12` or right-click and select "Inspect".
   - Go to the **Application** tab.
   - Select **Service Workers** in the left sidebar.

4. **Check if the service worker is registered:**

   - You should see your service worker listed with status "activated" or "activated and running".
   - If not listed, check the **Console** tab for errors related to service worker registration.

5. **Verify service worker file accessibility:**

   - In the browser, open `http://localhost:5000/service-worker.js`.
   - You should see the content of your service worker file.
   - If you get 404 or other errors, the file is not served correctly.

6. **Clear previous service workers and cache:**

   - In the **Application > Service Workers** tab, click **Unregister** if any old service workers exist.
   - Clear site data via **Application > Clear storage > Clear site data**.
   - Reload the page.

7. **Check service worker registration code:**

   - Confirm your registration code in `src/scripts/index.js` uses the correct path `/service-worker.js`.
   - Ensure the app is accessed via the same origin as the service worker scope.

8. **Check console for errors:**

   - Any errors during registration will appear in the console.
   - Common issues include scope mismatch, file not found, or HTTPS requirement.

If after these steps the service worker still does not register, please provide:

- The exact URL you use to access the app.
- Any console errors shown.
- Confirmation that `service-worker.js` is accessible via browser.

I can assist further based on this information.
