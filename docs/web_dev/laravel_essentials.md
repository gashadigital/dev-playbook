# Laravel Essentials

**Core concepts, environment setup, and project structure for Laravel.**

---

## 1. Prerequisites & Installation

Before starting, ensure you have **PHP 8.3** and **Composer** installed.

### Installing Composer

Download and install Composer from [getcomposer.org](https://getcomposer.org/). Verify with:

```bash
composer --version
```

### Creating a New Project

Run this command in your terminal:

```bash
composer create-project laravel/laravel my-laravel-app
```

## 2. Environment Configuration (.env)

Laravel uses the `.env` file at the root to manage sensitive configurations.

**Database Connection (WAMP Stack)**
Update these lines to connect to your manual WAMP setup:

```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3340          # Use the port you set (default 3306 or 3340)
DB_DATABASE=my_app_db
DB_USERNAME=root
DB_PASSWORD=swordfish # The password you set in the MySQL setup
```

## 3. Key Directory Structure

- `app/Models/`: Contains your Eloquent database models.
- `app/Http/Controllers/`: Contains the logic that handles user requests.
- `routes/web.php`: Defines the URLs for your web application.
- `resources/views/`: Contains your Blade templates (HTML).
- `database/migrations/`: Defines your database table structures.

## 4. Essential Artisan Commands

The `php artisan` tool is your best friend in Laravel development.

- `php artisan serve`: Starts the local development server.
- `php artisan make`:controller NameController: Generates a new controller.
- `php artisan make`:model Name -m: Creates a model and a migration file.
- `php artisan migrate`: Runs your migrations to create tables in MySQL.
- `php artisan route:list`: Shows all registered routes in your app.

## 5. Advanced Artisan Commands

### 🗄️ Database Management

- `php artisan migrate --path=/database/migrations/specific_file.php`: Runs only a specific migration file instead of the whole folder.
- `php artisan db:seed --class=UserSeeder`: Runs a specific seeder class.
- `php artisan migrate:fresh --seed`: Crucial Command. It drops all tables, re-runs all migrations from scratch, and then runs the default `DatabaseSeeder`. Perfect for resetting your dev environment.

### 📁 Storage & Filesystem

- `php artisan storage:link`: Creates a symbolic link from `public/storage` to `storage/app/public`. This is required to make uploaded files (like user avatars) accessible to the web browser.

### ⚡ Optimization & Cache Clearing

- `php artisan cache:clear`: Clears the application cache.
- `php artisan config:clear`: Removes the configuration cache file.
- `php artisan config:cache`: Combines all configuration files into one for faster loading (use this in Production).
- `php artisan optimize:clear`: A "master" clear command that removes the cache for config, routes, views, and events all at once.

### ⚙️ Queue Handling (Background Tasks)

- `php artisan queue:work`: Starts a process that listens for and executes background jobs (like sending emails).
- `php artisan queue:restart`: Signal the queue workers to restart after they finish their current job. Use this whenever you update your code so the workers pick up the new changes.

## 6. Basic Workflow (MVC)

- **Route:** Define a URL in `routes/web.php`

```php
Route::get('/user', [UserController::class, 'index']);
```

- **Controller:** Fetch data in `UserController.php`

```php
public function index() {
    $users = User::all();
    return view('users.index', ['users' => $users]);
}
```

- **View:** Display data in `resources/views/users/index.blade.php`

```php
@foreach ($users as $user)
    <p>{{ $user->name }}</p>
@endforeach
```
