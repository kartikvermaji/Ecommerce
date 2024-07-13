# E-commerce: A MERN Stack E-commerce Website

## Introduction
This E-commerce platform is a full-featured web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides a seamless shopping experience for users and a robust management interface for administrators. This README provides an overview of the app's features, setup instructions, and other essential details.

### Screenshots

*(Add pictures of all pages, including login and registration pages)*
![image](https://github.com/user-attachments/assets/0ab31fa9-8c97-468f-9412-c2ed6fe749bb)
![image](https://github.com/user-attachments/assets/15b25b91-d959-42be-a2a6-b7f4d7209f0f)
![image](https://github.com/user-attachments/assets/481359ee-b4f9-4fdc-9720-bd399b672a16)
![image](https://github.com/user-attachments/assets/b550b7c1-d775-4358-9a78-105e2842c6ef)
![image](https://github.com/user-attachments/assets/78e19527-c24a-4b5c-bb80-f3a3b8c6afbf)
![image](https://github.com/user-attachments/assets/31c1f69f-4be5-4929-ac5b-3eb88c43c812)
![image](https://github.com/user-attachments/assets/6f49af19-a4c3-4791-81ae-3251548eaf0b)
![image](https://github.com/user-attachments/assets/e6e98f9b-853f-480d-a084-1b1e20f2028f)

## Features

### User Features

1. **User Authentication**:
   - Login and registration pages.
   - Secure authentication using JSON Web Tokens (JWT).

2. **Shopping Experience**:
   - Beautiful hero page with top and new products.
   - Product carousels to showcase featured items.
   - Filter-based searching by brand and category.
   - Add products to favorites.
   - Purchase products and view order history.

3. **Responsive Design**:
   - Good-looking UI that is responsive across devices.

### Admin Features

1. **Product Management**:
   - Add, update, or delete products.
   - View traffic statistics and user information.
   - Manage all orders and sales from the website.

2. **Sales and Orders**:
   - View and manage all sales and orders.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Git

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/ecommerce.git
   cd ecommerce
   ```

2. **Install server dependencies**:
   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```sh
   cd ../client
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the `server` directory and add the following:
   ```
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the development server**:

   In the `server` directory, run:
   ```sh
   npm start
   ```

   In the `client` directory, run:
   ```sh
   npm start
   ```

### Usage

- **Register and Login**: Access the registration and login pages to create a new account or log into an existing one.
- **Browse Products**: View the hero section, top products, new products, and product carousels.
- **Filter Products**: Use filter-based searching to find products by brand and category.
- **Favorite and Purchase Products**: Add products to favorites, purchase items, and view order history.
- **Admin Management**: Admins can add, update, delete products, view website traffic, manage users, and handle all orders and sales.




## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, feel free to reach out at [kartikvermaji@gmail.com].

---

**E-commerce** - Your One-Stop Online Shopping Destination

---

This README provides a comprehensive guide to getting started with the E-commerce platform, including features, setup, and usage instructions. Feel free to customize and expand this document as needed.
