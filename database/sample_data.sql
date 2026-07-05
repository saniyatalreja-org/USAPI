INSERT INTO categories (category_name, description)
VALUES
('Books', 'Academic books and novels'),
('Electronics', 'calculators, printers, monitors, mice, projectors, keyboards'),
('Gadgets', 'laptops, tablets, headphones, smartwatche'),
('Accessories', 'backpacks, stationery, laptop bags, phone cases, chargers, and cables'),
('Project Components', 'ICs, sensors, breadboards, wires, capacitors, batteries');

INSERT INTO universities (university_name, city)
VALUES
('Iqra University', 'Karachi'),
('NED University', 'Karachi'),
('FAST NUCES', 'Karachi'),
('IBA Karachi', 'Karachi'),
('DHA Suffa University', 'Karachi');

INSERT INTO reviews
(reviewer_id, reviewed_user_id, rating, comment)
VALUES
(1,2,5,'Excellent seller, highly recommended.'),
(2,1,4,'Very cooperative during the exchange.'),
(1,3,5,'Project partner was very helpful.');


INSERT INTO project_requests
(user_id, project_title, project_category, description, required_members, deadline, status)

VALUES
(
1,
'DBMS Marketplace',
'Database',
'Need frontend developer for DBMS semester project.',
2,
'2026-08-10',
'Open'
),

(
2,
'Physics Line Follower Robot',
'Electronics',
'Looking for Arduino programmer.',
1,
'2026-08-15',
'Open'
),

(
1,
'DLD Traffic Light System',
'Digital Logic Design',
'Need one member for circuit implementation.',
1,
'2026-08-20',
'Open'
);

INSERT INTO messages
(sender_id, receiver_id, message)

VALUES

(
1,
2,
'Hi! Is the DBMS book still available?'
),

(
2,
1,
'Yes, it is available.'
),

(
1,
2,
'Great! Can we meet tomorrow at SZABIST?'
);


INSERT INTO exchange_requests
(listing_id, sender_id, receiver_id, message, status)

VALUES

(
1,
2,
1,
'Can I exchange my Physics book for your DBMS book?',
'Pending'
),

(
2,
1,
2,
'I would like to exchange my calculator.',
'Accepted'
),

(
5,
3,
1,
'Interested in swapping project components.',
'Pending'
);