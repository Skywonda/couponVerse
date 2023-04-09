# Coupon System API for E-commerce Website

This is a Node.js backend project built with Express.js and Sequelize ORM. It implements a flexible coupon system API that allows for different discount strategies without requiring major rewrites in the future.

## Features

- Cart API endpoints: The /cart endpoint shows a small list of items by default with each item having a name and price. The list is just big enough to showcase the coupon system. It also returns the total price. The /coupon endpoint accepts a coupon code, checks its validity, and returns the total adjusted price and discount amount.

- Coupon RULES: The coupon system implements the following rules:

  - Cart total price must be greater than $X before discounts.
  - Cart must contain at least N items.

- Coupon DISCOUNT TYPES: The coupon system implements the following discount types:

  - Fixed amount off the total price.
  - Percent-off total price.
  - Percent off or fixed amount off the total price, whichever results in the greatest discounts.

- Coupon Codes: The system has the following coupon codes:

  - Coupon FIXED10:
    - Rules:
      - Cart total price must be greater than $50 before discounts.
      - Cart must contain at least 1 item.
    - Discounts:
      - $10 off total (fixed amount off).
  - Coupon PERCENT10:
    - Rules:
      - Cart total price must be greater than $100 before discounts.
      - Cart must contain at least 2 items.
    - Discounts:
      - 10% off total (percent off).
  - Coupon MIXED10:
    - Rules:
      - Cart total price must be greater than $200 before discounts.
      - Cart must contain at least 3 items.
    - Discounts:
      - 10% or $10 off (whichever is greater).
  - Coupon REJECTED10:
    - Rules:
      - Cart total price must be greater than $1000 before discounts.
    - Discounts:
      - $10 off total (fixed amount off).
      - 10% off total (percent off).

## Endpoints

- POST /coupon

  - It creates new coupon to the database. If code is not specified, random numbers are generated.

- GET /coupon/display

  - It displays all list of active coupon in the database .

- GET /coupon?coupon=FIXED10

  - It accepts a query called coupon and return the discount information on cart items.

- GET /products

  - It returns the list of items in the database.

- GET /cart

  - It returns the list of items in the cart.

- POST /cart
  - It adds new item to the cart.
