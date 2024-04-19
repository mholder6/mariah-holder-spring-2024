import sqlite3

# Connect to SQLite database (create if not exists)
conn = sqlite3.connect("shaw_university.db")
cursor = conn.cursor()

# Create tables
cursor.execute('''CREATE TABLE IF NOT EXISTS staff (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    position TEXT)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS internships (
                    company TEXT PRIMARY KEY,
                    position TEXT,
                    duration TEXT,
                    location TEXT,
                    stipend INTEGER)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    major TEXT)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS news (
                    title TEXT PRIMARY KEY,
                    date TEXT,
                    content TEXT,
                    author TEXT)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS statistics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    mean TEXT,
                    median TEXT,
                    mode TEXT,
                    percentage TEXT)''')

# Sample data
staff_data = [
    ("John Doe", "Professor"),
    ("Jane Smith", "Assistant Professor"),
    ("Michael Johnson", "Lecturer"),
    ("Emily Davis", "Administrator"),
    ("David Wilson", "Researcher")
]

internships_data = [
    ("ABC Corp", "Software Engineer", "3 months", "New York", 2000),
    ("XYZ Ltd", "Marketing Intern", "6 months", "Los Angeles", 1500),
    ("123 Industries", "Data Analyst", "4 months", "Chicago", 1800),
    ("Tech Solutions", "Web Developer", "5 months", "San Francisco", 2200),
    ("Global Enterprises", "Business Analyst", "3 months", "Seattle", 1900)
]

students_data = [
    ("Alice Johnson", "Computer Science"),
    ("Bob Smith", "Electrical Engineering"),
    ("Eva Brown", "Psychology"),
    ("Max Wilson", "Biology"),
    ("Sophia Lee", "English Literature")
]

news_data = [
    ("New Research Findings", "2024-04-15", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "John Doe"),
    ("Internship Opportunities", "2024-04-14", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Jane Smith"),
    ("Student Achievements", "2024-04-13", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Michael Johnson"),
    ("Upcoming Events", "2024-04-12", "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "Emily Davis"),
    ("Faculty Spotlight", "2024-04-11", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "David Wilson")
]

statistics_data = [
    ("100", "90", "85", "95%"),
    ("98", "85", "80", "92%"),
    ("88", "78", "75", "85%"),
    ("95", "88", "82", "90%"),
    ("92", "85", "80", "88%")
]

# Insert sample data
cursor.executemany("INSERT INTO staff (name, position) VALUES (?, ?)", staff_data)
cursor.executemany("INSERT INTO internships (company, position, duration, location, stipend) VALUES (?, ?, ?, ?, ?)", internships_data)
cursor.executemany("INSERT INTO students (name, major) VALUES (?, ?)", students_data)
cursor.executemany("INSERT INTO news (title, date, content, author) VALUES (?, ?, ?, ?)", news_data)
cursor.executemany("INSERT INTO statistics (mean, median, mode, percentage) VALUES (?, ?, ?, ?)", statistics_data)

# Commit changes and close connection
conn.commit()
conn.close()

print("Database created successfully.")
