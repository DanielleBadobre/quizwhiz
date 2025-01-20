# QuizWhiz: AI-Powered Flashcard Generator

**QuizWhiz** is a modern, feature-rich web application that leverages the **Gemini AI API** to generate flashcards based on user inputs. It supports three modes of input—text, file uploads, and topic-based input—and enables users to download flashcards in **CSV format**, compatible with tools like **Anki**. Built using the **MERN stack** and designed for efficiency and simplicity, QuizWhiz aims to make studying and knowledge retention seamless.

---

## **Features**
1. **AI-Powered Flashcard Generation**:
   - Generates flashcards based on:
     - Raw text input.
     - Uploaded files (TXT, PDFs).
     - Topic-based input.

2. **Seamless Downloads**:
   - Flashcards can be exported in CSV format, ready for Anki or other flashcard tools.

3. **User-Friendly Interface**:
   - Modern and responsive design with intuitive navigation.
   - Easy-to-use forms for each input method.

4. **Backend Services**:
   - File sanitization and processing.
   - AI text generation via Gemini API integration.

---

## **Tech Stack**
- **Frontend**: 
  - React.js (TypeScript)
  - Tailwind CSS
  - Vite

- **Backend**:
  - Node.js (TypeScript)
  - Express.js
  - MongoDB (for future storage and user personalization capabilities)


---

## **Installation and Setup**

### Prerequisites
1. [Node.js](https://nodejs.org/) installed on your machine.
2. [MongoDB](https://www.mongodb.com/) (if you plan to extend the project with database features).
3. A valid **Gemini AI API key**.

---

### Local Development
Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DanielleBadobre/quizwhiz.git
   cd quizwhiz
   ```

2. **Install Dependencies**:
   Navigate to the `project` folder and run:
   ```bash
   cd project
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the `server` directory and add the following variables:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   BASE_URL=http://localhost:5000
   ```

4. **Run the Backend**:
   In the `server` directory:
   ```bash
   npm run dev
   ```

5. **Run the Frontend**:
   Navigate to the `src` directory:
   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

---

## **Project Structure**

```plaintext
project/
├── server/             # Backend files
│   ├── routes/         # Deck routes
│   ├── config/         # Configuration files
│   ├── controllers/    # Business logic for API
│   ├── middleware/     # Middleware for error handling and validation
│   ├── models/         # Mongoose models for MongoDB
│   ├── services/       # Utility services (AI, file processing)
│   ├── utils/          # Helper functions
│   └── index.ts        # Main server entry point
├── src/                # Frontend files
│   ├── components/     # Reusable React components
│   ├── context/        # Context API for global state
│   ├── pages/          # Page-level React components
│   ├── services/       # API service calls
│   └── App.tsx         # App entry point
├── vercel.json         # Vercel configuration file
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

---

## **Usage**
1. Select one of the three input methods:
   - **Text**: Paste or type the content you want flashcards for.
   - **File**: Upload a supported file (e.g., PDF).
   - **Topic**: Provide a topic for AI to generate relevant flashcards.

2. Review the generated flashcards.

3. Click **Download** to export flashcards in CSV format.

4. Import the CSV file into Anki or another flashcard tool.

---

## **Deployment**
To deploy on Vercel:
1. Connect the GitHub repository to your Vercel account.
2. Set the root directory in Vercel settings to `project`.
3. Add your environment variables in the Vercel dashboard:
   - `GEMINI_API_KEY`
   - `BASE_URL`
4. Trigger a deployment.

---

## **Future Enhancements**
- Add user accounts for saving and managing flashcards.
- Support for additional file formats.
- Real-time AI suggestions for flashcard edits.
- Integration with other flashcard apps.

---

## **Contributing**
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch.
3. Submit a pull request.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Acknowledgments**
- [Gemini AI API](https://example.com/gemini-api) for powering the flashcard generation.
- [Anki](https://apps.ankiweb.net/) for inspiring the export format.
- Open-source libraries and tools used in the project.

---

Feel free to reach out with questions or feedback! Happy learning with **QuizWhiz**!