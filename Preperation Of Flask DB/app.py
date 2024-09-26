import os
from flask import Flask, render_template_string
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Auto-incrementing ID
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Store hashed passwords

    def __repr__(self):
        return f'<User {self.username}>'

# Function to check if the database exists and create it if needed
def create_db_if_not_exists():
    if not os.path.exists('users.db'):
        # Create the database
        with app.app_context():
            db.create_all()
            print("Database created.")
    else:
        print("Database already exists.")

# Function to add a user from Python code
def add_user(username, email, password):
    # Check if a user with the given email already exists
    existing_user = User.query.filter_by(email=email).first()
    
    if existing_user:
        print(f'Error: User with email {email} already exists!')
        return
    
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        print(f'User {username} added successfully!')
    except Exception as e:
        db.session.rollback()
        print(f'Error occurred: {e}')
    finally:
        db.session.close()

# Route to display users in the browser
@app.route('/users')
def show_users():
    users = User.query.all()  # Query all users from the database
    user_list_html = '''
    <h1>User List</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
        </tr>
        {% for user in users %}
        <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
        </tr>
        {% endfor %}
    </table>
    '''
    return render_template_string(user_list_html, users=users)

# Flask route for checking if the app is running
@app.route('/')
def index():
    return 'Flask is running!'

if __name__ == '__main__':
    # Check if the database exists and create it if not
    create_db_if_not_exists()

    # Add users programmatically within the app context
    with app.app_context():
        add_user('john_121doe', 'john12@example.com', 'password123')
    

    # Run the Flask app
    app.run(debug=True)
