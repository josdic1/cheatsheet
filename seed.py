# seed.py

from app import create_app
from extensions import db, bcrypt
from models import User, Language, Category, Cheat

app = create_app()

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        user = User(name="Jos", email="jos@jos.com")
        user.password = "1111"
        db.session.add(user)
        db.session.commit()

        languages = [Language(name="Python"), Language(name="JavaScript"), Language(name="SQL")]
        db.session.add_all(languages)
        db.session.commit()

        categories = [Category(name="Basics"), Category(name="Web Development"), Category(name="Data Manipulation")]
        db.session.add_all(categories)
        db.session.commit()

        python = Language.query.filter_by(name="Python").first()
        js = Language.query.filter_by(name="JavaScript").first()
        sql_lang = Language.query.filter_by(name="SQL").first()
        basics = Category.query.filter_by(name="Basics").first()
        web = Category.query.filter_by(name="Web Development").first()
        data = Category.query.filter_by(name="Data Manipulation").first()

        cheats = [
            Cheat(title="Python List Comprehension", code="[x**2 for x in range(10)]", notes="Squares 0-9", user=user, category=basics, language=python),
            Cheat(title="JS Fetch API", code="fetch('/api/data').then(r => r.json()).then(d => console.log(d))", notes="Basic GET", user=user, category=web, language=js),
            Cheat(title="SQL INNER JOIN", code="SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id", notes="Join tables", user=user, category=data, language=sql_lang)
        ]

        db.session.add_all(cheats)
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_data()