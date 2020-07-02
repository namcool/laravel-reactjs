# Information
This is modified ver. of https://github.com/ammezie/tasksman.git
# Getting Started
Clone the project repository by running the command below if you use SSH
```sh
git clone git@github.com:namcool/laravel-reactjs.git
```
If you use https, use this instead
```sh
git clone https://github.com/namcool/laravel-reactjs.git
```
## After cloning, run:

```sh
composer install
```
```sh
npm install
```
Duplicate .env.example and rename it .env

Then run:
```sh
php artisan key:generate
```
Prerequisites
Be sure to fill in your database details in your .env file before running the migrations:
```sh
php artisan migrate
```
And finally, start the application:
```sh
php artisan serve
```
and visit http://localhost:8000 to see the application in action.

### Built With

Laravel - The PHP Framework For Web Artisans

React - A JavaScript library for building user interfaces
