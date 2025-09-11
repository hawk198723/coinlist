import React from 'react';

const FirebaseSetup = () => {
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <h2>
            <i className="fas fa-cog" style={{ marginRight: '10px' }}></i>
            Firebase Setup Required
          </h2>
          <p>Follow these steps to enable authentication and database features</p>
        </div>

        <div style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
              <i className="fas fa-fire" style={{ marginRight: '8px', color: '#ff6b35' }}></i>
              Step 1: Create Firebase Project
            </h3>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Visit <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--button-bg)' }}>Firebase Console</a></li>
              <li>Click "Create a project"</li>
              <li>Enter project name: <code style={{ background: 'var(--hover-bg)', padding: '2px 6px', borderRadius: '4px' }}>coinlist</code></li>
              <li>Disable Google Analytics (optional)</li>
              <li>Click "Create project"</li>
            </ol>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
              <i className="fas fa-shield-alt" style={{ marginRight: '8px', color: '#4caf50' }}></i>
              Step 2: Enable Authentication
            </h3>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>In Firebase console, go to "Authentication"</li>
              <li>Click "Get started"</li>
              <li>Go to "Sign-in method" tab</li>
              <li>Enable "Email/Password"</li>
              <li>Save changes</li>
            </ol>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
              <i className="fas fa-database" style={{ marginRight: '8px', color: '#2196f3' }}></i>
              Step 3: Setup Firestore Database
            </h3>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Go to "Firestore Database"</li>
              <li>Click "Create database"</li>
              <li>Choose "Test mode" for now</li>
              <li>Select a location (preferably close to your users)</li>
              <li>Click "Done"</li>
            </ol>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
              <i className="fas fa-code" style={{ marginRight: '8px', color: '#9c27b0' }}></i>
              Step 4: Get Configuration
            </h3>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Go to Project Settings ⚙️</li>
              <li>Scroll down to "Your apps"</li>
              <li>Click "Web app" icon {"</>"}</li>
              <li>Enter app nickname: <code style={{ background: 'var(--hover-bg)', padding: '2px 6px', borderRadius: '4px' }}>coinlist-web</code></li>
              <li>Click "Register app"</li>
              <li>Copy the config object</li>
            </ol>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
              <i className="fas fa-file-alt" style={{ marginRight: '8px', color: '#ff9800' }}></i>
              Step 5: Create .env File
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Create a <code style={{ background: 'var(--hover-bg)', padding: '2px 6px', borderRadius: '4px' }}>.env</code> file in your project root with:
            </p>
            <div style={{ 
              background: 'var(--hover-bg)', 
              padding: '16px', 
              borderRadius: '8px', 
              fontFamily: 'monospace', 
              fontSize: '14px',
              overflowX: 'auto'
            }}>
              <div>REACT_APP_FIREBASE_API_KEY=your_api_key</div>
              <div>REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com</div>
              <div>REACT_APP_FIREBASE_PROJECT_ID=your_project_id</div>
              <div>REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com</div>
              <div>REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id</div>
              <div>REACT_APP_FIREBASE_APP_ID=your_app_id</div>
            </div>
          </div>

          <div style={{ 
            background: 'var(--hover-bg)', 
            padding: '16px', 
            borderRadius: '8px', 
            borderLeft: '4px solid var(--button-bg)' 
          }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>
              <i className="fas fa-lightbulb" style={{ marginRight: '8px' }}></i>
              Pro Tips
            </h4>
            <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '20px' }}>
              <li>Restart your development server after adding .env file</li>
              <li>Never commit .env file to version control</li>
              <li>Firebase Spark plan is free and perfect for development</li>
              <li>You can always upgrade to paid plans later</li>
            </ul>
          </div>
        </div>

        <div className="auth-footer" style={{ marginTop: '32px' }}>
          <p>
            Need help? Check the{' '}
            <a 
              href="https://firebase.google.com/docs/web/setup" 
              target="_blank" 
              rel="noopener noreferrer"
              className="auth-link"
            >
              Firebase Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseSetup;
