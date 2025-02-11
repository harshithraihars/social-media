# LinkedIn Clone

A feature-rich LinkedIn clone built using modern web technologies to replicate the core functionalities of the professional networking platform.

## 🌐 Live Demo
[Check out the live demo here](https://dummy-link.com)

## 🚀 Features
- User Authentication (Sign up, Sign in, and Sign out) using Clerk.
- Create, edit, and view user profiles.
- Post creation, liking, and commenting.
- Networking features to connect with other users.
- Responsive design for seamless usage across devices.

## 🛠 Tech Stack
### Frontend
- **Framework:** Next.js (React-based framework)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN

### State Management
- **Redux:** For managing global state.

### Backend
- **Database:** MongoDB
- **Authentication:** Clerk for user management.

## 📦 Installation and Setup
Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd linkedin-clone
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env.local` file in the root of the project.
   - Add the following variables:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
     CLERK_API_KEY=your_clerk_api_key
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## 📂 Folder Structure
```
linkedin-clone/
├── components/        # Reusable components
├── pages/             # Application routes
├── styles/            # Global styles
├── redux/             # Redux slices and store
├── utils/             # Utility functions
├── public/            # Static assets
├── .env.local         # Environment variables
└── package.json       # Project dependencies
```

## 🔧 Future Enhancements
- Real-time notifications for user interactions.
- Direct messaging feature.
- Advanced search for job postings and users.
- Integration with third-party APIs for additional functionalities.

## 🐛 Known Issues
- None reported at the moment. Feel free to raise issues if you encounter any.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

## 👤 Author
**Harshith**
- [LinkedIn](https://www.linkedin.com/in/dummy-profile)
- [Portfolio](https://dummy-portfolio.com)


