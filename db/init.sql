CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  rating INT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO feedback (name, email, rating, message) VALUES 
('John Doe', 'john@example.com', 5, 'Great service!'),
('Jane Smith', 'jane@example.com', 4, 'Very helpful and responsive.');
