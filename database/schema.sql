CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    department VARCHAR(50) NOT NULL,
    batch VARCHAR(20) NOT NULL,
    role VARCHAR(20) DEFAULT 'Student'
        CHECK (role IN ('Student', 'Admin')),
    profile_image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);
CREATE TABLE listings (
    listing_id SERIAL PRIMARY KEY,

    user_id INT NOT NULL,
    category_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT,

    price DECIMAL(10,2) NOT NULL
        CHECK(price >= 0),

    listing_type VARCHAR(20) NOT NULL
        CHECK (listing_type IN ('Sale','Rent')),

    item_condition VARCHAR(20)
        CHECK (item_condition IN ('New','Like New','Good','Fair')),

    status VARCHAR(20)
        DEFAULT 'Available'
        CHECK (status IN ('Available','Reserved','Sold','Rented')),

    location VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);
CREATE TABLE wishlist (

    wishlist_id SERIAL PRIMARY KEY,

    user_id INT NOT NULL,

    listing_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (listing_id)
        REFERENCES listings(listing_id)
        ON DELETE CASCADE,

    UNIQUE(user_id, listing_id)
);
CREATE TABLE transactions (

    transaction_id SERIAL PRIMARY KEY,

    listing_id INT NOT NULL,

    buyer_id INT NOT NULL,

    seller_id INT NOT NULL,

    amount DECIMAL(10,2)
        CHECK(amount >= 0),

    transaction_type VARCHAR(20)
        CHECK(transaction_type IN ('Buy','Rent')),

    payment_method VARCHAR(30)
        DEFAULT 'Cash'
        CHECK(payment_method IN ('Cash','EasyPaisa','JazzCash','Bank Transfer')),

    status VARCHAR(20)
        DEFAULT 'Pending'
        CHECK(status IN ('Pending','Completed','Cancelled')),

    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (listing_id)
        REFERENCES listings(listing_id),

    FOREIGN KEY (buyer_id)
        REFERENCES users(user_id),

    FOREIGN KEY (seller_id)
        REFERENCES users(user_id)
);
CREATE TABLE universities (

    university_id SERIAL PRIMARY KEY,

    university_name VARCHAR(100) NOT NULL,

    city VARCHAR(100) NOT NULL
);
ALTER TABLE users

ADD COLUMN university_id INT;

ALTER TABLE users

ADD CONSTRAINT fk_university

FOREIGN KEY (university_id)

REFERENCES universities(university_id);
CREATE TABLE reviews (

    review_id SERIAL PRIMARY KEY,

    reviewer_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    reviewed_user_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    rating INT CHECK (rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE project_requests (

    request_id SERIAL PRIMARY KEY,

    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    project_title VARCHAR(150) NOT NULL,

    project_category VARCHAR(100),

    description TEXT,

    required_members INT,

    deadline DATE,

    status VARCHAR(30) DEFAULT 'Open',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE messages (

    message_id SERIAL PRIMARY KEY,

    sender_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    receiver_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    message TEXT NOT NULL,

    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE exchange_requests (

    request_id SERIAL PRIMARY KEY,

    listing_id INT REFERENCES listings(listing_id) ON DELETE CASCADE,

    sender_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    receiver_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    message TEXT,

    status VARCHAR(30) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);