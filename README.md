# BOOK APP

A Web application that allows a user to register books. ​ Book App helps the library managers to register books with their serial numbers.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

You need to install the following to be able to run the project on your local machine.

To check if you have Node.js installed, run this command in your terminal:

`node -v`

To confirm that you have npm installed you can run this command in your terminal:

`npm -v`

## Then

`npm install npm@latest -g`

## Installing

Installing this application is fairly straightforward. After cloning this repository to your local environment,CD into the package folder on your favorite terminal... bash, command prompt or the like and run the following:

      > npm install
      this command installs all dependences.

This runs the following script on the background processes;

      > npm run dev

This command starts the dev server on port 8080.

## Running the api & tests Locally

- To clone this repo: in your terminal => use git clone https://github.com
- Switch to develop branch with => git checkout develop
- Run `npm run dev` You should see: "Server started, App runing on port 8080.
- With Postman, test if all endpoints work (Find a list of endpoint in the table at the bottom of this page)

## RESTful API Routes.

| Method | Endpoint                          | Description                               |
| ------ | --------------------------------- | ------------------------- ----------------|
| POST   | /auth/register                    | Register a user                           |
| POST   | /auth/login                       | User login                                |
| GET    | /books                            | query all books sorted by price           |