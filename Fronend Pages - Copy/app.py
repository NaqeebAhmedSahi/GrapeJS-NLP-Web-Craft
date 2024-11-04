# app.py
from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # Database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # For flashing messages
db.init_app(app)

# Create the database and tables
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # Create a new user instance
        new_user = User(username=username, email=email, password=password)
        
        # Add the user to the session and commit
        db.session.add(new_user)
        db.session.commit()

        flash('Sign up successful!', 'success')  # Flash message
        return redirect(url_for('index'))

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
