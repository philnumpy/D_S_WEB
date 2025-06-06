from flask import Flask, request, jsonify
from database import db
from models import Customer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///customers.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Create tables if not already created
with app.app_context():
    db.create_all()

# Route to add a new customer
@app.route('/customers', methods=['POST'])
def add_customer():
    data = request.get_json()

    if not data.get('name') or not data.get('email'):
        return jsonify({"error": "Name and email are required"}), 400

    if Customer.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    new_customer = Customer(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone')
    )
    db.session.add(new_customer)
    db.session.commit()

    return jsonify(new_customer.to_dict()), 201

# Route to get all customers
@app.route('/customers', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return jsonify([c.to_dict() for c in customers]), 200

if __name__ == '__main__':
    app.run(debug=True)
